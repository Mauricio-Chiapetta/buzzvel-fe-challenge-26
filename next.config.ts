import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Finds the request config at ./i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Branded 404 for URLs outside the [locale] root layout (app/global-not-found.tsx).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
