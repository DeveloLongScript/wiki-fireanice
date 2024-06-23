import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GeistMono } from "geist/font/mono";
import { interFont } from "@/lib/interFont";
const convertToSlug = (s: string) => {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export function H1(props: any) {
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  return (
    <>
      <div className="inline-flex group">
        <h1 {...props} className={"m-0 p-0 pb-2 " + interFont} />
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="ml-3 invisible group-hover:visible h-[30px]"
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${origin}${router.asPath}#${convertToSlug(props.children)}`,
                );
              }}
            >
              <Copy size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            This will copy a link containing the header that was used.
          </TooltipContent>
        </Tooltip>
      </div>
      <hr className="m-0 p-0 pb-10" />
    </>
  );
}

export function H2(props: any) {
  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  return (
    <>
      <div className="inline-flex group">
        <h2 {...props} className="m-0 p-0 pb-2" />
        <Tooltip>
          <TooltipTrigger>
            <Button
              className="ml-3 invisible group-hover:visible h-[30px]"
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${origin}${router.asPath}#${convertToSlug(props.children)}`,
                );
              }}
            >
              <Copy size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            This will copy a link containing the header that was used.
          </TooltipContent>
        </Tooltip>
      </div>
      <hr className="m-0 p-0 pb-4" />
    </>
  );
}

export function Code(props: any) {
  return <code {...props} className={GeistMono.className} />;
}
