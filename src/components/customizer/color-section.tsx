import { useConfig } from "@/hooks/use-config";
import { themes } from "@/registry/themes";
import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ColorSection: React.FC = () => {
	const [config, setConfig] = useConfig();
	const [mounted, setMounted] = React.useState(false);
	const { resolvedTheme: mode } = useTheme();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="space-y-1.5">
			<Label className="text-xs">Color</Label>
			<div className="grid grid-cols-3 gap-2">
				{themes.map((theme) => {
					const isActive = config.theme === theme.name;

					return mounted ? (
						<Button
							variant={"outline"}
							size="sm"
							key={theme.name}
							onClick={() => {
								const { radius } = config.cssVars.light;

								setConfig({
									...config,
									theme: theme.name,
									cssVars: {
										...theme.cssVars,
										light: {
											...theme.cssVars.light,
											radius,
										},
										dark: {
											...theme.cssVars.dark,
											radius,
										},
									},
								});
							}}
							className={cn(
								"justify-start",
								isActive && "border-2 border-primary",
							)}
							style={
								{
									"--theme-primary": `hsl(${
										theme?.activeColor[mode === "dark" ? "dark" : "light"]
									})`,
								} as React.CSSProperties
							}
						>
							<span
								className={cn(
									"mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
								)}
							>
								{isActive && <CheckIcon className="w-4 h-4 text-white" />}
							</span>
							{theme.label}
						</Button>
					) : (
						<Skeleton className="w-full h-8" key={theme.name} />
					);
				})}
			</div>
		</div>
	);
};

export default ColorSection;
