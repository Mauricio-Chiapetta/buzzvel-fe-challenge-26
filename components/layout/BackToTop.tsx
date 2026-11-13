"use client";

import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ArrowUpIcon, type ArrowUpIconHandle } from "@/components/icons/animated/arrow-up";

/**
 * Footer "Back to top" button: smooth-scrolls to the top with Lenis (instant under reduced
 * motion, which Lenis handles) and moves keyboard focus back to the start of the page.
 * The lucide-animated arrow nudges up on hover/focus.
 */
export function BackToTop() {
  const t = useTranslations("footer");
  const lenis = useLenis();
  const iconRef = useRef<ArrowUpIconHandle>(null);

  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { force: true });
    else window.scrollTo({ top: 0 });

    // Keep keyboard / screen reader users in sync with what they see.
    const main = document.getElementById("main");
    if (main) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }

  const play = () => iconRef.current?.startAnimation();
  const reset = () => iconRef.current?.stopAnimation();

  return (
    <button
      type="button"
      onClick={scrollToTop}
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
      className="group flex items-center gap-2 rounded-full border border-divider py-1.5 pr-4 pl-2 text-caption text-white-secondary transition-colors duration-300 hover:border-white hover:text-white focus-visible:outline-white"
    >
      <ArrowUpIcon
        ref={iconRef}
        size={16}
        className="flex size-6 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white group-hover:text-ink"
      />
      {t("backToTop")}
    </button>
  );
}
