import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function PlayerContents({ center }: any) {
  const [offline, setOffline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    fetch("https://api.minehut.com/servers").then((val) =>
      val.json().then((m) => {
        m.servers.forEach((s: any, i: number) => {
          if (s.name == "FireAnIceBox") {
            setPlayers(s.playerData.playerCount);
            setLoading(false);
          }
          if (i == m.servers.length && loading) {
            setOffline(true);
            setLoading(false);
          }
        });
      }),
    );
  }, []);

  if (loading)
    return (
      <div
        className={
          center == true
            ? ""
            : "border rounded w-[300px] h-[40px] p-[.1rem] pl-3 flex items-center"
        }
      >
        <span className="flex items-center">
          <span className="relative flex h-[.5rem] w-[.5rem]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 border"></span>
            <span className="relative inline-flex rounded-full h-[.5rem] w-[.5rem] border"></span>
          </span>

          <span className="pl-2">Loading player count...</span>
        </span>
      </div>
    );

  return (
    <div
      className={
        center == true
          ? "w-full"
          : "border rounded w-[300px] h-[40px] p-[.1rem] pl-3 flex items-center"
      }
    >
      <span className="flex items-center text-center">
        {offline ? (
          <span className="relative flex h-[.5rem] w-[.5rem]">
            <span className="relative inline-flex rounded-full h-[.5rem] w-[.5rem] border"></span>
          </span>
        ) : (
          <span className="relative flex h-[.5rem] w-[.5rem]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0cce6b]"></span>
            <span className="relative inline-flex rounded-full h-[.5rem] w-[.5rem] bg-[#0cce6b]"></span>
          </span>
        )}

        <span className="pl-2 text-center">
          {offline ? (
            "Currently offline"
          ) : (
            <>
              {players}{" "}
              {players == 1 ? "player currently" : "players currently"} online
            </>
          )}
        </span>
        <div className="pl-3">
          <Button
            variant="ghost"
            className={"w-[60px] h-[30px] inline-flex"}
            onClick={() => {
              navigator.clipboard.writeText("FireAnIceBox.minehut.gg");
              toast("Copied to clipboard");
            }}
          >
            Copy IP
          </Button>
        </div>
      </span>
    </div>
  );
}
