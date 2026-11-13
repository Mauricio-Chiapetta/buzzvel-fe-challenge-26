/** Absolute base for OG/canonical URLs — Vercel's production URL when deployed, localhost otherwise. */
export const siteUrl = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);
