import type messages from "../messages/en.json";
import type { Locale, routing } from "./routing";

/** Long-form section content is authored per locale in typed modules (see data/*). */
export type Localized<T> = Record<Locale, T>;

// Type-safe message keys and locales for next-intl (en.json is the source of truth).
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
