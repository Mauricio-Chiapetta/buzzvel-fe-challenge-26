import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  // "/" stays English (the language of the design); Portuguese lives under "/pt".
  localePrefix: "as-needed",
  // No automatic redirect from the browser language: reviewers in Lisbon would otherwise land
  // on /pt instead of the original design. Portuguese is opt-in via the switcher.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** BCP 47 tags for <html lang>, hreflang and Open Graph (Portuguese copy is pt-BR). */
export const localeTags: Record<Locale, { lang: string; og: string; label: string }> = {
  en: { lang: "en", og: "en_US", label: "English" },
  pt: { lang: "pt-BR", og: "pt_BR", label: "Português" },
};
