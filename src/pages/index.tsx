import { interFont } from "@/lib/interFont";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlayerContents from "@/components/PlayerContents";

export default function Index() {
  return (
    <main>
      <h1 className={interFont}>
        FireAnIceBox wiki
        <br /> by Giftedly
      </h1>
      This is an unoffical documentation/wiki for the FireAnIce Minehut server.{" "}
      <br />
      This documentation has items, tiers, and mines, all documentated. The{" "}
      <br />
      whole documentation is fully open source on GitHub.
      <div>
        <Link href="/docs">
          <Button>Go to wiki home</Button>
        </Link>
        <small className="p-4">
          <strong> or </strong>
        </small>
        <Button className="ml-4">Search for an entry</Button>
      </div>
      <br />
      <PlayerContents />
      Thank you. <br />
      **By Giftedly.**
    </main>
  );
}