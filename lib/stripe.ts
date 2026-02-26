import Stripe from "stripe";
import { env } from "@/lib/env";

/**
 * Stripe client singleton.
 *
 * Usage:
 *   import { stripe } from "@/lib/stripe"
 *   const session = await stripe.checkout.sessions.create({ ... })
 *
 * Webhook verification (in app/api/webhooks/stripe/route.ts):
 *   const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
 */
export const stripe = env.STRIPE_SECRET_KEY
  ? new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia",
      typescript: true,
    })
  : null;
