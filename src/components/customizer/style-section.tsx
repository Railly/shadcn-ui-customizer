import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";

const StyleSection: React.FC = () => {
  const [config, setConfig] = useConfig();

  const handleStyleChange = (style: "default" | "new-york") => {
    setConfig({
      ...config,
      style,
    });
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center w-full">
        <Label className="text-xs">Style</Label>
        <Popover>
          <PopoverTrigger>
            <InfoCircledIcon className="w-3 h-3 ml-1" />
            <span className="sr-only">About styles</span>
          </PopoverTrigger>
          <PopoverContent
            className="space-y-3 rounded-[0.5rem] text-sm"
            side="right"
            align="start"
            alignOffset={-20}
          >
            <p className="font-medium">
              What is the difference between the New York and Default style?
            </p>
            <p>
              A style comes with its own set of components, animations, icons
              and more.
            </p>
            <p>
              The <span className="font-medium">Default</span> style has larger
              inputs, uses lucide-react for icons and tailwindcss-animate for
              animations.
            </p>
            <p>
              The <span className="font-medium">New York</span> style ships with
              smaller buttons and cards with shadows. It uses icons from Radix
              Icons.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => handleStyleChange("default")}
          className={cn(
            config.style === "default" && "border-2 border-primary"
          )}
        >
          Default
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => handleStyleChange("new-york")}
          className={cn(
            config.style === "new-york" && "border-2 border-primary"
          )}
        >
          New York
        </Button>
      </div>
    </div>
  );
};

export default StyleSection;
