import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths inside a locale ("/pt/whatever", or "/whatever" rewritten to the
 * default locale by the proxy) so they render the localized not-found page.
 */
export default function CatchAll() {
  notFound();
}
