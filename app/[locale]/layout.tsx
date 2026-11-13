import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { localeTags, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import "../globals.css";

/** Both locales are prerendered at build time (static HTML for "/" and "/pt"). */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: siteUrl,
    title: { default: t("title"), template: "%s | Luma" },
    description: t("description"),
    applicationName: "Luma",
    keywords: ["online courses", "product design", "technology", "business", "creative skills"],
    alternates: {
      canonical: path,
      // hreflang alternates so search engines can pair the two language versions
      languages: { en: "/", "pt-BR": "/pt", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Luma",
      title: t("ogTitle"),
      description: t("description"),
      url: path,
      locale: localeTags[locale].og,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeTags[l].og),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={localeTags[locale].lang} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <SmoothScroll>
            <MotionProvider>{children}</MotionProvider>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
