import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Type-safe environment variables.
 *
 * IMPORTANT: This is the ONLY place where process.env is accessed.
 * Import `env` from this module everywhere else.
 */
export const env = createEnv({
  /**
   * Server-side env vars (never exposed to browser).
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),

    // Clerk
    CLERK_SECRET_KEY: z.string().min(1),

    // Upstash Redis
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Resend (email)
    RESEND_API_KEY: z.string().min(1).optional(),
    EMAIL_FROM: z.string().email().default("noreply@example.com"),

    // Stripe
    STRIPE_SECRET_KEY: z.string().min(1).optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

    // UploadThing
    UPLOADTHING_TOKEN: z.string().min(1).optional(),

    // OpenAI / AI SDK
    OPENAI_API_KEY: z.string().min(1).optional(),

    // Trigger.dev
    TRIGGER_SECRET_KEY: z.string().min(1).optional(),
  },

  /**
   * Client-side env vars (must be prefixed with NEXT_PUBLIC_).
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  },

  /**
   * Map process.env to the schema above.
   * Needed for Next.js edge runtime compatibility.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,

    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,

    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
