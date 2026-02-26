import pino from "pino";

/**
 * Structured server-side logger.
 *
 * Usage:
 *   import { logger } from "@/lib/logger"
 *   logger.info({ userId }, "User signed in")
 *   logger.error({ err }, "Payment failed")
 *
 * Rules:
 * - Never use console.log in production code — use this logger
 * - Never log sensitive data (passwords, tokens, PII)
 * - Always include structured context as the first argument
 */
export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  ...(process.env.NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});
