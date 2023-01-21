// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  CONTENTFUL_BASE_ENDPOINT: z.string(),
  CONTENTFUL_SPACE_ID: z.string(),
  CONTENTFUL_DELIVERY_TOKEN: z.string(),
  CONTENTFUL_PREVIEW_ENABLED: z.string(),
  NODE_ENV: z.string().nullable()
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_BAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  CONTENTFUL_BASE_ENDPOINT: process.env.CONTENTFUL_BASE_ENDPOINT,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_ENABLED: process.env.CONTENTFUL_PREVIEW_ENABLED,
  NODE_ENV: process.env.NODE_ENV
};
