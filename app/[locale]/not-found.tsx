import { getLocale, getTranslations } from "next-intl/server";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { routing } from "@/i18n/routing";

/** Localized 404 for unknown paths under "/" and "/pt" (rendered inside the locale layout). */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  const tCommon = await getTranslations("common");

  return (
    <>
      <title>{`${t("title")} | Luma`}</title>
      <NotFoundView
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("description")}
        backHome={t("backHome")}
        homeHref={locale === routing.defaultLocale ? "/" : `/${locale}`}
        logoAlt={tCommon("logoAlt")}
      />
    </>
  );
}
