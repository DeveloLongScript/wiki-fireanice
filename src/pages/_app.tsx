import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from "geist/font/sans";
import { useState, useEffect } from "react";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import LoadingBar from "react-top-loading-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextIcon from "@/components/TextIcon";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { allPages } from "@/allPages";
import { SquareArrowOutUpRight } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // START VALUE - WHEN LOADING WILL START
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    // COMPLETE VALUE - WHEN LOADING IS FINISHED
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <main className={GeistSans.className + " prose"}>
        <LoadingBar
          color="#000000"
          progress={progress}
          style={{ height: 3.5 }}
          onLoaderFinished={() => {
            setProgress(0);
          }}
        />
        <div className="h-[50px] w-full border-b backdrop-blur fixed z-10 flex items-center">
          <strong className="text-2xl p-4">FireAnIceBox Wiki</strong>
          <div className="items-end flex">
            <span className="font-normal">version 0.1.3</span>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="pt-20 pl-10 pr-8 max-md:hidden"
            minSize={17}
            maxSize={17}
          >
            <ScrollArea
              className="fixed z-0 overflow-auto mr-30"
              style={{ height: "calc(100vh - 80px)" }}
            >
              <Link
                href="/"
                className={
                  router.pathname == "/"
                    ? ""
                    : "no-underline" + " font-normal hover:font-medium"
                }
              >
                Home
              </Link>
              <br />
              <br />
              {allPages.map((b) => (
                <>
                  <strong key={b.name}>{b.name}</strong> <br />
                  {b.pages.map((p) => (
                    <>
                      <Link
                        key={p.name}
                        href={p.href}
                        className={
                          router.pathname == p.href
                            ? ""
                            : "no-underline" +
                              " font-normal hover:font-medium p-0"
                        }
                      >
                        {p.name}
                        {"  "}
                        {p.description && (
                          <>
                            <br />
                            <span className="text-muted-foreground font-nomral hover:font-normal text-sm">
                              {p.description}
                            </span>
                          </>
                        )}
                      </Link>
                      <br />
                    </>
                  ))}
                  <br />
                </>
              ))}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <ScrollArea>
              <div
                className="p-20 pl-10 pr-40 z-10"
                style={{ height: "calc(100vh - 20px)" }}
              >
                <Component {...pageProps} />
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>

        <Toaster />
      </main>
    </TooltipProvider>
  );
}
