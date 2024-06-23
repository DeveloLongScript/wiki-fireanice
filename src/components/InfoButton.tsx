import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function InfoButton({ desc, touch }: any) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="ghost" className="w-[20px] h-[20px]">
            <InfoIcon size={16} />{" "}
          </Button>
        </TooltipTrigger>
        {touch ? (
          <TooltipContent side="left" sideOffset={-60} className="font-normal">
            {desc}
          </TooltipContent>
        ) : (
          <TooltipContent>{desc}</TooltipContent>
        )}
      </Tooltip>
    </>
  );
}
