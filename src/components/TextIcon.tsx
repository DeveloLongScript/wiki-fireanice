import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TextIcon({ text, icon }: any) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="border-2 rounded border-dotted">{text}</span>
      </TooltipTrigger>
      <TooltipContent>
        <Image src={"/wiki-resources/" + icon} height={48} width={48} alt="" />
      </TooltipContent>
    </Tooltip>
  );
}
