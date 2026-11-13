import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 "proxy" (formerly middleware): resolves the locale from the URL prefix.
export default createMiddleware(routing);

export const config = {
  // Skip API/internal paths, files with an extension and metadata routes without one.
  matcher: "/((?!api|_next|_vercel|opengraph-image|twitter-image|.*\..*).*)",
};
