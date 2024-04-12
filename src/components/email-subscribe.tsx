"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    setStatus("submitting");
    try {
      const res = await axios.post("/api/subscribe", { email });
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.statusText);
      }
      setEmail("");
      setStatus("idle");
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-sm gap-6"
    >
      <legend className="font-mono border border-amber-400 dark:border-yellow-400 border-dashed px-2 py-1.5 rounded-lg text-xs bg-accent text-accent-foreground">
        A PG Database Assistant is comming... Stay tuned
      </legend>
      <div className="flex w-full gap-4">
        <Input
          type="email"
          placeholder="jhon.doe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="w-[18ch]"
          type="button"
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
