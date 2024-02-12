import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://eu1-curious-sheepdog-38451.upstash.io",
  token: process.env.REDIS_KEY!,
});
