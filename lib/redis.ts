import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { env } from "@/lib/env";

/**
 * Upstash Redis client.
 *
 * Usage:
 *   import { redis } from "@/lib/redis"
 *   await redis.set("key", "value", { ex: 60 })
 *   const value = await redis.get("key")
 */
export const redis = env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN ?? "",
    })
  : null;

/**
 * Default rate limiter — 10 requests per 10 seconds per identifier (IP).
 * Sliding window algorithm.
 *
 * Usage:
 *   import { ratelimit } from "@/lib/redis"
 *   const { success } = await ratelimit.limit(ip)
 *   if (!success) return new Response("Too many requests", { status: 429 })
 */
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: true,
      prefix: "ratelimit",
    })
  : null;

/**
 * Strict rate limiter for auth endpoints — 5 requests per 60 seconds.
 */
export const authRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true,
      prefix: "ratelimit:auth",
    })
  : null;
