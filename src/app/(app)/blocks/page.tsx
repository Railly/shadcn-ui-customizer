import { getAllBlockIds } from "@/lib/blocks";
import { BlockDisplay } from "@/components/block-display";
import Header from "@/app/header";
import { Metadata } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GitBranchIcon, StarIcon } from "lucide-react";
import EmailSubscribe from "@/components/email-subscribe";

export const metadata: Metadata = {
  title: "Shadcn UI Customizer",
  description:
    "Customize Shadcn UI to match your style. Choose colors, adjust themes, and copy the generated CSS.",
  authors: [
    {
      name: "Railly Hugo",
      url: "https://raillyhugo.com",
    },
    {
      name: "Shadcn",
      url: "https://ui.shadcn.com",
    },
  ],
};

export default async function BlocksPage() {
  const blocks = await getAllBlockIds();

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <Header />
      <PageHeader className="!text-center flex flex-col gap-2 py-2 pt-10">
        <PageHeaderHeading className="text-center w-full">
          ✨ Customize Shadcn UI to Match Your Style ✨
        </PageHeaderHeading>
        <PageHeaderDescription className="w-full !text-center flex justify-center">
          Choose colors, adjust themes, and copy the generated CSS.
        </PageHeaderDescription>
        <div className="flex flex-col items-center w-full justify-center mt-8 gap-6">
          <div className="flex w-full max-w-sm gap-4">
            <Link
              href="https://github.com/Railly/shadcn-ui-customizer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full"
              )}
              target="_blank"
            >
              <StarIcon className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
            <Link
              href="https://github.com/shadcn-ui/ui/pull/1210"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full"
              )}
              target="_blank"
            >
              <GitBranchIcon className="mr-2 h-4 w-4" />
              PR for shadcn-ui
            </Link>
          </div>
          <EmailSubscribe />
          <div>
            <p className="flex gap-2 text-center text-sm sm:text-left">
              <span>
                Created by{" "}
                <Link
                  href="https://raillyhugo.com"
                  className="font-medium underline underline-offset-4"
                  target="_blank"
                >
                  @raillyhugo
                </Link>
              </span>
              {" | "}
              <span>
                UI components by{" "}
                <Link
                  href="https://twitter.com/shadcn"
                  className="font-medium underline underline-offset-4"
                  target="_blank"
                >
                  @shadcn
                </Link>
                .
              </span>
            </p>
          </div>
        </div>
      </PageHeader>
      {/* Demo or Screenshots Section */}
      <section className="relative mt-16">
        <div className="container mx-auto px-2">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
              See It in Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch how the Shadcn UI Customizer works in{" "}
              <Link
                className="text-foreground font-medium underline underline-offset-4"
                href="/"
              >
                Themes{" "}
              </Link>{" "}
              or{" "}
              <Link
                className="text-foreground font-medium underline underline-offset-4"
                href="/blocks"
              >
                Blocks{" "}
              </Link>
              !
            </p>
          </div>
          <div className="mt-12 md:w-[98vw] flex flex-col flex-1">
            {blocks.map((name, index) => (
              <BlockDisplay key={`${name}-${index}`} name={name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
