"use client";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { useTheme } from "next-themes";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig();
  const { resolvedTheme: mode } = useTheme();

  const currentTheme = mode === "dark" ? "dark" : "light";

  const prefixedCssVars = Object.keys(config.cssVars[currentTheme]).reduce(
    (acc, key) => {
      const value =
        config.cssVars[currentTheme as keyof typeof config.cssVars][
          key as keyof (typeof config.cssVars)["light"]
        ];
      acc[`--${key}`] = value !== undefined ? `${value}` : "";
      return acc;
    },
    {} as Record<string, string>
  );

  const style = {
    ...prefixedCssVars,
    "--radius": `${defaultTheme ? "0.5" : config.cssVars.light.radius}rem`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        `theme-${defaultTheme || config.theme}`,
        "w-full",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
