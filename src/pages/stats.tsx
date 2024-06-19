import PlayerContents from "@/components/PlayerContents";

export default function Stats() {
  return (
    <>
      <h1>Statistics</h1>
      <strong>FireAnIce Discord</strong>
      <iframe
        src="https://discord.com/widget?id=1162527690616741971&theme=dark"
        width="350"
        height="500"
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
      <br />
      <strong>Wiki Discord</strong>
      <iframe
        src="https://discord.com/widget?id=1252673956192714774&theme=dark"
        width="350"
        height="500"
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>{" "}
      <br />
      <strong>Server Players</strong>
      <PlayerContents />
      <br />
    </>
  );
}
