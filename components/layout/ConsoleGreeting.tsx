"use client";

import { useEffect } from "react";

const REPO_URL = "https://github.com/Mauricio-Chiapetta/buzzvel-fe-challenge-26";

/** Module-level flag: log once per page load (Strict Mode runs effects twice in development). */
let greeted = false;

/** Easter egg for whoever opens the DevTools: a short note about how the page was built. */
export function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;

    console.log(
      "%cl.%c  Hi there, curious developer 👋",
      "font: 800 28px 'Plus Jakarta Sans', sans-serif; color: #3157f6;",
      "font: 600 14px Inter, sans-serif; color: #171b2c;",
    );
    console.log(
      [
        "Built for the Buzzvel Front-End Challenge 2026 with:",
        "  • Next.js 16 (App Router, static prerendering) + TypeScript + Tailwind CSS 4",
        "  • Motion + Lenis for animations, all respecting prefers-reduced-motion",
        "  • next-intl: English at /, Portuguese at /pt",
        "",
        `Source code & decisions: ${REPO_URL}`,
      ].join("\n"),
    );
  }, []);

  return null;
}
