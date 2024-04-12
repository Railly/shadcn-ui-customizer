import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

const kv = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const emailSetKey = "email-set";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email } = data;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email provided." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const isMember = await kv.sismember(emailSetKey, email);
    if (isMember) {
      return new NextResponse(
        JSON.stringify({ message: "Email is already subscribed." }),
        {
          status: 409,
          statusText: "Email is already subscribed.",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await kv.sadd(emailSetKey, email);

    return new NextResponse(
      JSON.stringify({ message: "Email saved successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to save email." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET() {
  try {
    const emails = await kv.smembers(emailSetKey);

    return new NextResponse(JSON.stringify({ emails }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error retrieving emails:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve emails." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
