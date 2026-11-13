"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Max vertical drift in px. The layer is oversized by this much so no edge shows. */
  amount?: number;
  /**
   * - `"viewport"` (default): drifts from +amount to -amount while the frame crosses the screen.
   * - `"top"`: for above-the-fold images — starts at 0 when the page is at the top and drifts
   *   as the frame scrolls out, so the first paint and the hydrated position are identical.
   */
  range?: "viewport" | "top";
  className?: string;
};

const subscribe = () => () => {};

/** True only after hydration — the server render (and first paint) never gets an offset. */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * "Inside the frame" parallax: place it inside an `overflow-hidden` frame and put a `fill`
 * image inside it. The image moves slower than the page. Disabled under reduced motion.
 */
export function ParallaxLayer({
  children,
  amount = 40,
  range = "viewport",
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: range === "top" ? ["start start", "end start"] : ["start end", "end start"],
  });
  const output = reduceMotion ? [0, 0] : range === "top" ? [0, amount] : [-amount, amount];
  const y = useTransform(scrollYProgress, [0, 1], output);

  return (
    <m.div
      ref={ref}
      style={{ y: hydrated ? y : 0, top: -amount, bottom: -amount }}
      className={cn("absolute inset-x-0 will-change-transform", className)}
    >
      {children}
    </m.div>
  );
}
