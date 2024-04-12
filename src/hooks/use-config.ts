"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Style } from "@/registry/styles";
import { Theme, CssVars, themes } from "@/registry/themes";

type Config = {
  style: Style["name"];
  theme: Theme["name"];
  cssVars: {
    light: Partial<CssVars["light"]>;
    dark: Partial<CssVars["dark"]>;
  };
};

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  theme: "zinc",
  cssVars: {
    light: themes.find((theme) => theme.name === "zinc")?.cssVars
      .light as Partial<CssVars["light"]>,
    dark: themes.find((theme) => theme.name === "zinc")?.cssVars
      .dark as Partial<CssVars["dark"]>,
  },
});

export function useConfig() {
  return useAtom(configAtom);
}
