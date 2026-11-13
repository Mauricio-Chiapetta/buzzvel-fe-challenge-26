"use client";

import { m, type Variants } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, revealViewport } from "./Reveal";

/*
 * Scroll-triggered version of the hero's mask reveal (MaskText.tsx is CSS-on-load).
 * Text slides up from behind overflow-hidden windows the first time it enters the viewport.
 * Under reduced motion, MotionConfig skips the transform so the text just appears.
 */
const maskClass = "inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom";

const slideUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

type ScrollMaskWordsProps = {
  text: string;
  /** Seconds before the first word. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
};

/** Word-by-word mask reveal. Give the parent heading an `aria-label` with the full text. */
export function ScrollMaskWords({ text, delay = 0, stagger = 0.06 }: ScrollMaskWordsProps) {
  const words = text.split(" ");
  return (
    <m.span
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={maskClass}>
            <m.span className="inline-block" variants={slideUp}>
              {word}
            </m.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </m.span>
  );
}

type ScrollMaskBlockProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Reveals a whole block (eyebrow, paragraph…) through one mask. */
export function ScrollMaskBlock({ children, delay = 0, className }: ScrollMaskBlockProps) {
  return (
    <div className={cn("overflow-hidden pb-[0.12em] -mb-[0.12em]", className)}>
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={{
          hidden: slideUp.hidden,
          show: { y: "0%", transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO } },
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
