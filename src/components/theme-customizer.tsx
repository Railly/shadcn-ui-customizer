"use client";

import * as React from "react";
import {
  CheckIcon,
  CopyIcon,
  InfoCircledIcon,
  MoonIcon,
  ResetIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import template from "lodash.template";
import { Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { copyToClipboardWithMeta } from "@/components/copy-button";
import { DrawerContent, DrawerTrigger } from "@/components/drawer";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { CssVars, Theme, themes } from "@/registry/themes";

import "@/styles/mdx.css";
import { Drawer } from "vaul";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Color, ColorResult, SketchPicker, Checkboard } from "react-color";
import CustomizerHeader from "./customizer/customizer-header";
import StyleSection from "./customizer/style-section";
import ColorSection from "./customizer/color-section";
import RadiusSection from "./customizer/radius-section";
import ModeSection from "./customizer/mode-section";
import ColorPickerSection from "./customizer/color-picker-section";

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Drawer.Root>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Paintbrush className="w-4 h-4 mr-2" />
            Customize
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[85%] p-6 pt-10">
          <Customizer />
        </DrawerContent>
      </Drawer.Root>
      <div className="flex md:hidden">
        <div className="mr-2 hidden items-center space-x-0.5 lg:flex">
          {mounted ? (
            <>
              {["zinc", "rose", "blue", "green", "orange"].map((color) => {
                const theme = themes.find((theme) => theme.name === color);
                const isActive = config.theme === color;

                if (!theme) {
                  return null;
                }

                return (
                  <Tooltip key={theme.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          setConfig({
                            theme: theme.name,
                            cssVars: theme.cssVars as any,
                            style: "default",
                          })
                        }
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                          isActive
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                        )}
                        style={
                          {
                            "--theme-primary": `hsl(${
                              theme?.activeColor[
                                mode === "dark" ? "dark" : "light"
                              ]
                            })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                    >
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </>
          ) : (
            <div className="flex items-center mr-1 space-x-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger className="hidden md:flex" asChild>
            <Button variant="outline">
              <Paintbrush className="h-4 mr-2" />
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-40 w-[30rem] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function Customizer({ className }: { className?: string }) {
  return (
    <ThemeWrapper
      defaultTheme="zinc"
      className={cn(
        "fixed inset-y-0 right-0 flex flex-col h-screen max-w-[30rem] p-4 space-y-4 overflow-y-scroll border-2 rounded-md shadow-sm scroll-y-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 md:space-y-6",
        className
      )}
    >
      <CustomizerHeader />
      <div className="flex flex-col flex-1 space-y-4 md:space-y-6">
        <StyleSection />
        <ColorSection />
        <RadiusSection />
        <ModeSection />
        <ColorPickerSection />
        <CopyCodeButton />
      </div>
    </ThemeWrapper>
  );
}

function CopyCodeButton() {
  const [config] = useConfig();
  // const activeTheme = themes.find((theme) => theme.name === config.theme);
  const activeTheme = config;
  const [hasCopied, setHasCopied] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <>
      {activeTheme && (
        <Button
          onClick={() => {
            copyToClipboardWithMeta(
              getThemeCode(
                activeTheme as any,
                config.cssVars.light?.radius || 0.5
              ),
              {
                name: "copy_theme_code",
                properties: {
                  theme: activeTheme.theme,
                  radius: String(config.cssVars.light?.radius),
                },
              }
            );
            setHasCopied(true);
          }}
          className="md:hidden"
        >
          {hasCopied ? (
            <CheckIcon className="w-4 h-4 mr-2" />
          ) : (
            <CopyIcon className="w-4 h-4 mr-2" />
          )}
          Copy
        </Button>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="sticky bottom-0 hidden font-bold rounded md:flex">
            Copy code
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl outline-none">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <ThemeWrapper defaultTheme="zinc" className="relative">
            <CustomizerCode />
            {activeTheme && (
              <Button
                size="sm"
                onClick={() => {
                  copyToClipboardWithMeta(
                    getThemeCode(
                      activeTheme as any,
                      config.cssVars.light?.radius || 0.5
                    ),
                    {
                      name: "copy_theme_code",
                      properties: {
                        theme: activeTheme.theme,
                        radius: String(config.cssVars.light?.radius),
                      },
                    }
                  );
                  setHasCopied(true);
                }}
                className="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
              >
                {hasCopied ? (
                  <CheckIcon className="w-4 h-4 mr-2" />
                ) : (
                  <CopyIcon className="w-4 h-4 mr-2" />
                )}
                Copy
              </Button>
            )}
          </ThemeWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CustomizerCode() {
  const [config] = useConfig();
  const activeTheme = themes.find((theme) => theme.name === config.theme);

  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="text-white line">@layer base &#123;</span>
            <span className="text-white line">&nbsp;&nbsp;:root &#123;</span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVars.light["background"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVars.light["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map((prefix) => (
              <>
                <span className="text-white line">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVars.light[
                      prefix as keyof typeof activeTheme.cssVars.light
                    ]
                  }
                  ;
                </span>
                <span className="text-white line">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVars.light[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVars.light
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVars.light["border"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVars.light["input"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVars.light["ring"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--radius: {config.cssVars.light?.radius}
              rem;
            </span>
            <span className="text-white line">&nbsp;&nbsp;&#125;</span>
            <span className="text-white line">&nbsp;</span>
            <span className="text-white line">&nbsp;&nbsp;.dark &#123;</span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVars.dark["background"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVars.dark["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map((prefix) => (
              <>
                <span className="text-white line">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVars.dark[
                      prefix as keyof typeof activeTheme.cssVars.dark
                    ]
                  }
                  ;
                </span>
                <span className="text-white line">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVars.dark[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVars.dark
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVars.dark["border"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVars.dark["input"]};
            </span>
            <span className="text-white line">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVars.dark["ring"]};
            </span>
            <span className="text-white line">&nbsp;&nbsp;&#125;</span>
            <span className="text-white line">&#125;</span>
          </code>
        </pre>
      </div>
    </ThemeWrapper>
  );
}

function getThemeCode(theme: Theme, radius?: number) {
  if (!theme) {
    return "";
  }

  if (!radius) {
    radius = 0.5;
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    colors: theme.cssVars,
    radius,
  });
}

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
  }
 
  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
  }
}
`;
