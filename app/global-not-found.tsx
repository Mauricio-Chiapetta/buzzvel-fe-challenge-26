import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import messages from "@/messages/en.json";
import "./globals.css";

/*
 * Fallback 404 for URLs that never reach the [locale] layout (e.g. paths with a file extension,
 * which the proxy skips). Bypasses the layouts, so it brings its own styles and fonts.
 * English only: the default language of the site.
 */
const t = messages.notFound;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: `${t.title} | Luma`,
  description: t.description,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <NotFoundView
          eyebrow={t.eyebrow}
          heading={t.heading}
          description={t.description}
          backHome={t.backHome}
          homeHref="/"
          logoAlt={messages.common.logoAlt}
        />
      </body>
    </html>
  );
}
