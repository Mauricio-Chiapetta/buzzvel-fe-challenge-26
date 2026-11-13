import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Static rendering: read the [locale] root param instead of request headers.
  if (!locale) {
    const param = await rootParams.locale();
    if (!hasLocale(routing.locales, param)) notFound();
    locale = param;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
