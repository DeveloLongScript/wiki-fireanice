import PlayerContents from "@/components/PlayerContents";

export default function Stats() {
  return (
    <>
      <h1>Statistics</h1>
      <strong>FireAnIce Discord</strong>
      <iframe
        src="https://discord.com/widget?id=1162527690616741971&theme=light"
        width="350"
        height="500"
        className="rounded border"
        allowTransparency={true}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
      <br />
      <strong>Wiki Discord</strong>
      <iframe
        src="https://discord.com/widget?id=1252673956192714774&theme=light"
        width="350"
        height="500"
        allowTransparency={true}
        className="rounded border"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>{" "}
      <br />
      <strong>Server Players</strong>
      <PlayerContents />
      <br />
    </>
  );
}
