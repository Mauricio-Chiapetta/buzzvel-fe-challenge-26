import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 "proxy" (formerly middleware): resolves the locale from the URL prefix.
export default createMiddleware(routing);

export const config = {
  // Skip API/internal paths and anything with a file extension (images, og.png, icons…).
  // The backslash must be doubled: a single "\." is just "." in a JS string, which matches
  // every path and silently disables the proxy (unknown URLs would never reach the 404).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
