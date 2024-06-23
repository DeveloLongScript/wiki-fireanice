import PlayerContents from "@/components/PlayerContents";
import {
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MobileView } from "react-device-detect";
import Alert from "@/components/Alert";
import { useEffectOnce } from "@/lib/useEffectOnce";
import InfoButton from "@/components/InfoButton";

export default function Stats() {
  const [today, setToday] = useState<any>([]);
  const [daily, setDaily] = useState<any>([]);
  const [rendered, setRendered] = useState(false);

  useEffectOnce(() => {
    fetch("/api/getAllData").then((c) =>
      c.json().then((v) => {
        v.todayData.forEach((c: any) => {
          setToday((v: any) => [
            ...v,
            { name: formatAMPM(new Date(c.time)), players: c.playerCount },
          ]);
        });
        v.avg.forEach((c: any) => {
          setDaily((v: any) => [
            ...v,
            {
              name:
                new Date(c.date * 1000).getMonth() +
                "/" +
                new Date(c.date * 1000).getDate() +
                "/" +
                new Date(c.date * 1000).getFullYear(),
              players: c.avg,
            },
          ]);
        });
      }),
    );
  });

  return (
    <>
      <h1>Statistics</h1>
      <PlayerContents />
      <br />
      <Alert
        title="This page should not be viewed on a mobile device."
        description="This page was made for desktop devices, and for bigger screens."
        variant="destructive"
        className="md:hidden"
      />
      <strong>
        Player Statistics{" "}
        <InfoButton desc="All information is in your local timezone." />
      </strong>
      <br />
      <LineChart width={1000} height={250} data={today}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="players" />
        <Tooltip />
        <Legend />
        <Line
          name="Players Online"
          type="monotone"
          dataKey="players"
          stroke="#8884d8"
        />
      </LineChart>
      <LineChart width={1000} height={250} data={daily}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="players" />
        <Tooltip />
        <Legend />
        <Line
          name="Average Player Count"
          type="monotone"
          dataKey="players"
          stroke="#8884d8"
        />
      </LineChart>
      <div className="md:flex">
        <div>
          <strong>FireAnIce Discord</strong>
          <iframe
            src="https://discord.com/widget?id=1162527690616741971&theme=light"
            width="500"
            height="500"
            className="rounded border mr-2"
            allowTransparency={true}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>
        <div>
          <strong>Wiki Discord</strong>
          <iframe
            src="https://discord.com/widget?id=1252673956192714774&theme=light"
            width="350"
            height="500"
            allowTransparency={true}
            className="rounded border"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>
      </div>{" "}
    </>
  );
}

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: any = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
