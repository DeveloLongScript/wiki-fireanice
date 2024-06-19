import rateLimitMiddleware from "@/middleware/rateLimiter";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmbedBuilder, WebhookClient } from "discord.js";

type ResponseData = {
  message: string;
};

const webhookClient = new WebhookClient({
  id: process.env.DISCORD_WEBID as string,
  token: process.env.DISCORD_WEBTOKEN as string,
});

function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const body = JSON.parse(req.body);
  const embed = new EmbedBuilder()
    .setColor(0x00ffff)
    .setTitle("Somebody requested a cease")
    .setFields(
      { name: "Author of cease", value: body.auth as string },
      { name: "URL of cease", value: body.url as string },
      { name: "Why the cease", value: body.why as string },
    )
    .setTimestamp();
  webhookClient.send({
    content: req.body.DISCORD_TAG,
    embeds: [embed],
    username: "Cease Bot",
  });

  res.status(200).json({ message: "Done!" });
}

export default rateLimitMiddleware(handler);
