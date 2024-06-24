import { Inngest } from "inngest";
import { serve } from "inngest/next";
import { MongoClient } from "mongodb";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "wiki-fireanicebox" });
var client: MongoClient | undefined = undefined;
if (process.env.MONGODB_URI != undefined)
  client = new MongoClient(process.env.MONGODB_URI);

export default serve({
  client: inngest,
  functions: [
    inngest.createFunction(
      { id: "daily-average" },
      [{ event: "daily-test" }, { cron: "1 0 * * *" }],
      async ({ event, step }) => {
        var al = 0;
        if (client != undefined) {
          await client.connect();
          const serverDB = client.db("snapshots");
          const previousDate = new Date();
          previousDate.setDate(previousDate.getDate() - 1);
          console.log(
            previousDate.getDate() +
              "/" +
              previousDate.getMonth() +
              "/" +
              previousDate.getFullYear(),
          );
          const prevCollection = serverDB.collection(
            previousDate.getDate() +
              "/" +
              previousDate.getMonth() +
              "/" +
              previousDate.getFullYear(),
          );
          var big = 0;
          await prevCollection.find().forEach((c) => {
            big += c.playerCount;
            return;
          });
          var num = big / (await prevCollection.count());
          al = num;
          const daysCollection = serverDB.collection("days");
          daysCollection.insertOne({
            date: Math.floor(previousDate.getTime() / 1000),
            avg: num,
          });
          prevCollection.drop();
        }
        return {
          event,
          body: "There are " + al + " players on average yesterday.",
        };
      },
    ),
    inngest.createFunction(
      { id: "hourly-stat" },
      [{ event: "hourly-test" }, { cron: "*/1 * * * *" }],
      async ({ event, step }) => {
        if (client != undefined) {
          await client.connect();
          const serverDB = client.db("snapshots");
          const today =
            new Date().getDate() +
            "/" +
            new Date().getMonth() +
            "/" +
            new Date().getFullYear();
          const collection = serverDB.collection(today);
          console.log(
            await // a custom user agent is needed so cloudflare doesn't yap
            (
              await fetch("https://api.minehut.com/servers", {
                headers: {
                  accept: "application/json",
                  Referer: "https://app.minehut.com/",
                  "Referrer-Policy": "strict-origin-when-cross-origin",
                  "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                },
                method: "GET",
              })
            ).text(),
          );
          const mhServers = await (
            await fetch("https://api.minehut.com/servers", {
              headers: {
                accept: "application/json",
                Referer: "https://app.minehut.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
              },
              method: "GET",
            })
          ).json();
          var found = false;
          mhServers.servers.forEach((server: any, i: number) => {
            if (server.name == "FireAnIceBox") {
              collection.insertOne({
                time: Date.now(),
                playerCount: server.playerData.playerCount,
              });

              found = true;
            }
            if (mhServers.servers.length - 1 == i && !found) {
              collection.insertOne({
                time: Date.now(),
                playerCount: 0,
              });
            }
          });
        }
        return { event, body: "Finished gathering data." };
      },
    ),
  ],
});
