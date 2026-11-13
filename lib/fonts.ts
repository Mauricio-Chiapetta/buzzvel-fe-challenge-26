import { Inter, Plus_Jakarta_Sans } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** CSS variables consumed by the `font-sans` / `font-display` theme tokens. */
export const fontVariables = `${inter.variable} ${jakarta.variable}`;
