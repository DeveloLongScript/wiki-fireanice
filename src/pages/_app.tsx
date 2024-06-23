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
import "@/styles/github-highlight.css";
import { Button } from "@/components/ui/button";
import { allPages } from "@/allPages";
import { ChevronDown, Menu, SquareArrowOutUpRight, Vote } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Metadata } from "next";
import FadeIn from "react-fade-in";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import * as React from "react";
import type { SVGProps } from "react";
import { MobileView } from "react-device-detect";
import Layout from "@/components/MDXLayout";
import { Separator } from "@/components/ui/separator";
import InfoButton from "@/components/InfoButton";
const Github = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 250"
    width="1em"
    height="1em"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
  </svg>
);

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const [mobile, setMobile] = useState(false);
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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className={GeistSans.className + " prose dark:prose-invert"}>
          <LoadingBar
            color="#000000"
            progress={progress}
            style={{ height: 3.5 }}
            onLoaderFinished={() => {
              setProgress(0);
            }}
          />
          <div className="h-[50px] w-full border-b backdrop-blur fixed z-10 flex items-center">
            <Link href="https://github.com/DeveloLongScript/wiki-fireanice">
              <Button
                size="icon"
                variant="outline"
                className="m-2 max-md:hidden"
              >
                <Github />
              </Button>
            </Link>
            <MobileView>
              <Button
                variant="outline"
                size="icon"
                className="m-2 md:hidden"
                onClick={() => setMobile(true)}
              >
                <Menu />
              </Button>
              <Drawer open={mobile} onOpenChange={setMobile}>
                <DrawerContent className={GeistSans.className}>
                  <DrawerHeader>
                    <ScrollArea className="h-[80vh] text-left">
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
                      <Link href="https://github.com/DeveloLongScript/wiki-fireanice">
                        GitHub
                      </Link>
                      <br />
                      <br />

                      {allPages.map((b: any) => (
                        <>
                          <strong key={b.name}>{b.name}</strong> <br />
                          {b.pages.map((l: any) => (
                            <SideButton
                              p={l}
                              key={l.name}
                              click={() => setMobile(false)}
                            />
                          ))}
                          <br />
                        </>
                      ))}
                    </ScrollArea>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </MobileView>

            <ThemeToggle className="m-2" />
            <strong className="text-2xl p-4">FireAnIceBox Wiki</strong>
            <div className="items-end flex">
              <span className="font-normal max-lg:hidden">version 0.7.0</span>
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
                <FadeIn>
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
                </FadeIn>
                <br />
                <FadeIn>
                  {allPages.map((b: any) => (
                    <>
                      <strong key={b.name}>{b.name}</strong> <br />
                      <Separator className="mb-2" />
                      {b.pages.map((p: any) => (
                        <SideButton key={p.name} p={p} />
                      ))}
                      <br />
                    </>
                  ))}
                </FadeIn>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <Layout>
                <ScrollArea>
                  <div
                    className="pt-20 pl-10 md:pr-40 max-md:pr-10 z-10 max-md:w-[90%]"
                    style={{ height: "calc(100vh - 20px)" }}
                  >
                    <FadeIn>
                      <Component {...pageProps} />
                    </FadeIn>
                  </div>
                </ScrollArea>
              </Layout>
            </ResizablePanel>
          </ResizablePanelGroup>

          <Toaster />
        </main>
      </ThemeProvider>
    </TooltipProvider>
  );
}

function SideButton({ p, click }: any) {
  const [dropdown, setDropDown] = useState(false);
  const router = useRouter();

  const rotate = dropdown ? "rotate(-90deg)" : "rotate(0)";
  return (
    <>
      <span className="flex items-center">
        {p.dropdown != undefined && (
          <>
            <Button
              size="icon"
              className="w-[18px] h-[18px] mr-2"
              variant="ghost"
              onClick={() => {
                setDropDown(!dropdown);
              }}
            >
              <ChevronDown
                size={16}
                style={{ transform: rotate, transition: "all 0.1s linear" }}
              />
            </Button>
          </>
        )}
        <Link
          href={p.href}
          onClick={click}
          className={
            router.pathname == p.href
              ? ""
              : "no-underline" + " font-normal hover:font-medium p-0"
          }
        >
          {p.name}
          {p.description != undefined && (
            <>
              <br />
              <span className="text-muted-foreground">{p.description}</span>
            </>
          )}
        </Link>
        <br />
      </span>
      {dropdown && (
        <FadeIn>
          {p.dropdown.map((v: any) => (
            <>
              <Link
                href={v.href}
                key={v.name}
                onClick={click}
                className={
                  router.pathname == v.href
                    ? "ml-7"
                    : "ml-7 no-underline font-normal hover:font-medium p-0"
                }
              >
                {v.name}
                {v.description != undefined && (
                  <>
                    <br />
                    <span className="text-muted-foreground">
                      {v.description}
                    </span>
                  </>
                )}
              </Link>
              <br />
            </>
          ))}
        </FadeIn>
      )}
    </>
  );
}
