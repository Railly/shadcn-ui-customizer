"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import JSConfetti from "js-confetti";
import { cn } from "@/lib/utils";

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
      } else {
        toast.error(res.data.error);
      }
      setEmail("");
    } catch (error: any) {
      toast.dismiss();

      toast.error(error.response.data.error);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl gap-6"
    >
      <div className="flex flex-col items-center md:flex-row gap-4 border border-amber-400 dark:border-yellow-400 border-dashed px-2 py-1.5 rounded-lg">
        <a href="https://tinte.railly.dev" target="_blank" rel="noreferrer">
          <img
            src="/tinte.png"
            alt="tinte screenshot"
            height={606}
            width={318}
          />
        </a>
        <div className="flex flex-col gap-4">
          <legend className="font-mono font-bold text-accent-foreground">
            Generate your own VS Code Themes
          </legend>
          <ol className="list-decimal flex flex-col gap-2 text-left list-inside text-xs">
            <li>
              Provide a 13 color palette or <b> generate one with AI</b>
            </li>
            <li>Adjust the theme settings to your liking</li>
            <li>Download the vsix file and install it in VS Code</li>
          </ol>
          <a
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
            href="https://tinte.railly.dev"
            target="_blank"
          >
            Try it for free
          </a>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Input
          type="email"
          autoComplete="email"
          placeholder="jhon.doe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="w-[18ch]"
          type="submit"
          disabled={status === "submitting" || email === ""}
        >
          {status === "submitting" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EmailSubscribe;
