import { createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/lib/logger";
import { z } from "zod";

/**
 * Base safe action client with error logging.
 *
 * Use `action` for public server actions (no auth required).
 * Use `authAction` for authenticated server actions.
 *
 * Usage (authenticated):
 *   const myAction = authAction
 *     .schema(z.object({ name: z.string() }))
 *     .action(async ({ parsedInput, ctx }) => {
 *       const { userId } = ctx
 *       return { ok: true }
 *     })
 *
 * Usage (public):
 *   const myPublicAction = action
 *     .schema(z.object({ email: z.string().email() }))
 *     .action(async ({ parsedInput }) => {
 *       return { ok: true }
 *     })
 */
export const action = createSafeActionClient({
  handleServerError(err) {
    logger.error({ err }, "Server action error");
    return err instanceof Error ? err.message : "Something went wrong. Please try again.";
  },
});

export const authAction = createSafeActionClient({
  handleServerError(err) {
    logger.error({ err }, "Auth server action error");
    return err instanceof Error ? err.message : "Something went wrong. Please try again.";
  },
}).use(async ({ next }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Please sign in to continue.");
  }

  return next({ ctx: { userId } });
});
