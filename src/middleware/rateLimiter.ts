const rateLimitMap = new Map();
const isProduction = process.env.NODE_ENV === "production";

export default function rateLimitMiddleware(handler: any) {
  return (req: any, res: any) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const limit = 1;
    const windowMs = 3000 * 1000;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit && isProduction) {
      return res.status(429).send("Too Many Requests");
    }

    ipData.count += 1;

    return handler(req, res);
  };
}
