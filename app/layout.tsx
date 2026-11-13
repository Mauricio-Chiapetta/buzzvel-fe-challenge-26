import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** Absolute base for OG/canonical URLs — Vercel's production URL when deployed, localhost otherwise. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luma | Practical online courses",
    template: "%s | Luma",
  },
  description,
  applicationName: "Luma",
  keywords: ["online courses", "product design", "technology", "business", "creative skills"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Luma",
    title: "Luma | Build skills that actually move you forward",
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luma | Build skills that actually move you forward",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
