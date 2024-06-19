import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function InfoButton({ desc }) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="ghost" className="w-[20px] h-[20px]">
            <InfoIcon size={16} />{" "}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{desc}</TooltipContent>
      </Tooltip>
    </>
  );
}
