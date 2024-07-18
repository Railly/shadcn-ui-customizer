import { useConfig } from "@/hooks/use-config";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

const RadiusSection: React.FC = () => {
	const [config, setConfig] = useConfig();

	return (
		<div className="space-y-1.5">
			<Label className="text-xs">Radius</Label>
			<div className="grid grid-cols-5 gap-2">
				{["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
					return (
						<Button
							variant={"outline"}
							size="sm"
							key={value}
							onClick={() => {
								setConfig({
									...config,
									cssVars: {
										...config.cssVars,
										light: {
											...config.cssVars.light,
											radius: parseFloat(value),
										}
									},
								});
							}}
							className={cn(
								config.cssVars.light?.radius === parseFloat(value) &&
									"border-2 border-primary",
								"flex gap-2 items-center justify-center",
							)}
						>
							<i
								style={{
									borderTopLeftRadius: `${value}rem`,
								}}
								className={cn(
									"w-6 h-6 bg-primary/20",
									"border-l-2 border-t-2 border-primary/70",
									{
										grayscale:
											config.cssVars.light?.radius !== parseFloat(value),
									},
								)}
							/>
							<span>{value}</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default RadiusSection;
