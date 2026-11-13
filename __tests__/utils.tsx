import { render, type RenderOptions } from "@testing-library/react";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactElement, ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

const messages = { en, pt };

/**
 * Renders with the same providers as the app (next-intl + strict LazyMotion), with features
 * loaded synchronously and every animation skipped so state changes are immediate.
 */
export function renderWithProviders(
  ui: ReactElement,
  { locale = "en", ...options }: { locale?: Locale } & Omit<RenderOptions, "wrapper"> = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
        <LazyMotion features={domMax} strict>
          <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
            {children}
          </MotionConfig>
        </LazyMotion>
      </NextIntlClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
