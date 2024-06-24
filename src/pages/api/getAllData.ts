import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

var client: MongoClient | undefined = undefined;
if (process.env.MONGODB_URI != undefined)
  client = new MongoClient(process.env.MONGODB_URI);

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  var todayData: any[] = [];
  var avg: any[] = [];
  console.log(client);
  if (client != undefined) {
    await client.connect();
    const db = client.db("snapshots");
    const date =
      new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear();
    const today = db.collection(date);
    await today.find().forEach((b) => {
      todayData.push(b);
    });
    await db
      .collection("days")
      .find()
      .forEach((c) => {
        avg.push(c);
      });
  }
  res.send({ todayData, avg });
}
