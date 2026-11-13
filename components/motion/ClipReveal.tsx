"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, revealViewport } from "./Reveal";

type ClipRevealProps = {
  children: ReactNode;
  /** Corner radius of the frame, so the curtain edge matches the rounded corners. */
  radius?: number;
  delay?: number;
  className?: string;
};

/**
 * Curtain image reveal (Awwwards "clip-path reveal"): the frame opens from the bottom up
 * while the content inside settles from a zoom. Under reduced motion it renders fully open
 * (clip-path isn't a transform, so MotionConfig alone wouldn't skip it).
 */
export function ClipReveal({ children, radius = 16, delay = 0, className }: ClipRevealProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: 1.3, delay, ease: EASE_OUT_EXPO };

  return (
    <m.div
      className={cn("overflow-hidden", className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={revealViewport}
      variants={{
        hidden: { clipPath: `inset(100% 0% 0% 0% round ${radius}px)` },
        show: { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, transition },
      }}
    >
      <m.div
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.25 }, show: { scale: 1, transition: { ...transition, duration: 1.6 } } }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
