"use client";

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Sparkles, Terminal, ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics/react"

const features = [
  {
    icon: "›",
    text: "Generate themes using AI or customize manually",
  },
  {
    icon: "›",
    text: "Precise control over colors and typography",
  },
  {
    icon: "›",
    text: "Real-time preview of all components",
  },
  {
    icon: "›",
    text: "One-click theme installation",
  },
]

export function EmailSubscribe() {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTheme = () => {
    track("Create Theme Clicked")
    window.open("https://tinte.railly.dev/shadcn", "_blank")
  }

  return (
    <Card className="w-full max-w-4xl border-zinc-800/30 bg-black overflow-hidden">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8 p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Themes</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Theme Generator for shadcn/ui
              </h2>
            </div>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[15px] text-zinc-400"
                >
                  <span className="text-zinc-600">{feature.icon}</span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300">
                <Terminal className="w-4 h-4" />
                <span className="text-sm font-medium">Install with CLI</span>
              </div>
              <div className="relative">
                <pre className="bg-zinc-950 rounded-md p-3 border border-zinc-800/30 font-mono text-sm overflow-x-auto">
                  <code className="text-zinc-400">
                    npx shadcn add <span className="text-zinc-500">&lt;theme-url&gt;</span>
                  </code>
                </pre>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleCreateTheme}
              className="bg-white text-black hover:bg-zinc-100 transition-colors duration-200"
              disabled={isLoading}
            >
              <Palette className="w-4 h-4 mr-2" />
              Create Theme
              <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
            </Button>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-zinc-950/50 border border-zinc-800/30">
            <a
              href="https://tinte.railly.dev/shadcn"
              target="_blank"
              rel="noreferrer"
              onClick={() => track("Tinte Link Clicked")}
            >
              <img
                src="/tinte-2.png"
                alt="tinte screenshot"
                height={1400}
                className="rounded-md hover:opacity-90 transition-opacity duration-200"
              />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmailSubscribe
