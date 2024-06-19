import { interFont } from "@/lib/interFont";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlayerContents from "@/components/PlayerContentsText";
import { BackgroundGradientAnimation } from "@/components/GradientAnim";

export default function Index() {
  return (
    <main>
      <BackgroundGradientAnimation className="prose-invert text-white">
        <div className="text-center pt-20 z-10">
          <h1
            className={
              interFont +
              " bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20"
            }
          >
            FireAnIceBox wiki
            <br /> by Giftedly
          </h1>
          This is an unoffical documentation/wiki for the FireAnIce Minehut
          server. <br />
          This documentation has items, tiers, and mines, all documentated. The{" "}
          <br />
          whole documentation is fully open source on GitHub.
          <br />
          <br />
          <div>
            <Link href="/docs" className="z-10 relative">
              <Button>Go to wiki home</Button>
            </Link>
            <small className="ml-[15px]">
              <strong> or </strong>
            </small>
            <Button className="ml-4 z-10 relative">Search for an entry</Button>
          </div>
          <br />
          <PlayerContents center={true} /> <br /> <br />
          Thank you. <br />
          <strong>by Giftedly</strong>
        </div>
      </BackgroundGradientAnimation>
    </main>
  );
}
