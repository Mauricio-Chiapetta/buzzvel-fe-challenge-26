"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

/** Height of the sticky header plus a little breathing room (matches `scroll-padding-top`). */
const HEADER_OFFSET = 80;

/**
 * Lenis smooth scrolling for the whole page. Motion's `useScroll` keeps working because Lenis
 * still scrolls the window natively — it only smooths the wheel input.
 * Lenis respects `prefers-reduced-motion` on its own (`respectReducedMotion` defaults to true).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.1 }}>
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}

/**
 * Smooth in-page anchor navigation. Lenis' built-in `anchors` option neither prevents the native
 * jump nor moves keyboard focus, so we handle `#hash` links ourselves:
 * scroll with Lenis (offset for the sticky header), update the URL and move focus to the target
 * — keeping the "Skip to content" link and keyboard navigation accessible.
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "#";

      // Captured before Next's <Link> handler, so preventing here stops its own hash navigation.
      event.preventDefault();

      if (hash === "#") {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0 });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET });
      else target.scrollIntoView();

      history.pushState(null, "", hash);

      // Move focus so keyboard / screen reader users continue from the target section.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }

    // Capture phase: runs before React/Next link handlers.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}
