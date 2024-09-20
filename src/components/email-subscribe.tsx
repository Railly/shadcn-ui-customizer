"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon, Sparkles, Terminal, Palette } from "lucide-react";
import { toast } from "sonner";
import JSConfetti from "js-confetti";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics/react";

const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setStatus("submitting");
      toast.loading("Subscribing...");
      const res = await axios.post("/api/subscribe", { email });
      toast.dismiss();
      if (res.status === 200) {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        toast.success(res.data.message);
        track("Email Subscribed", { email });
      } else {
        toast.error(res.data.error);
        track("Email Subscription Failed", { error: res.data.error });
      }
      setEmail("");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response.data.error);
      track("Email Subscription Error", { error: error.response.data.error });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl gap-6"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg shadow-lg">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-cyan-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-24 h-24 bg-blue-300 rounded-full opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="flex-shrink-0">
            <a
              href="https://tinte.railly.dev/shadcn"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("Tinte Link Clicked")}
            >
              <img
                src="/tinte-2.png"
                alt="tinte screenshot"
                width={290}
                className="rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </a>
          </div>
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              New: AI generative shadcn/ui customizer
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-yellow-300">✓</span> Customize or
                AI-generate your shadcn/ui theme
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300">✓</span> Fine-tune colors,
                typography, and component styles
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300">✓</span> Improved UX for
                easier theme creation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300">✓</span> Export and use in
                your shadcn/ui projects
              </li>
            </ul>
            <div className="mt-4 bg-black bg-opacity-30 rounded-md p-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4" />
                Install your theme with shadcn CLI
              </h3>
              <code className="text-xs bg-black bg-opacity-50 p-2 rounded block">
                npx shadcn add{" "}
                <span className="text-yellow-300">&lt;your-theme-url&gt;</span>
              </code>
            </div>
            <a
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "mt-4 font-semibold bg-white hover:bg-gray-200 text-purple-900 hover:text-purple-700 transition-colors duration-300"
              )}
              href="https://tinte.railly.dev/shadcn"
              target="_blank"
              onClick={() => track("Create Custom Theme Button Clicked")}
            >
              <Palette className="w-4 h-4 mr-2" />
              Create Your Custom Theme
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailSubscribe;
