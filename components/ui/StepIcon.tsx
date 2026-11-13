"use client";

import { m, type Transition, type Variants } from "motion/react";
import type { StepIcon as StepIconName } from "@/data/howItWorks";

type StepIconProps = {
  name: StepIconName;
  /** Entrance delay in seconds (orchestrated by the timeline). */
  delay?: number;
};

const springIn: Transition = { type: "spring", stiffness: 180, damping: 14 };
const hover = {
  scale: 1.08,
  rotate: 8,
  transition: { type: "spring", stiffness: 300, damping: 12 },
} as const;

/**
 * Abstract 56px step illustrations (CSS shapes, as in the Figma file).
 * Entrance (Motion variants triggered by the parent step): the outer shape spins and scales in,
 * then the inner piece makes its own move — the square spins into place, the orange ball rolls
 * in from the left, the mustard ball drops and bounces. Spring hover on top.
 * Transforms are skipped under reduced motion (MotionConfig).
 */
export function StepIcon({ name, delay = 0 }: StepIconProps) {
  const shape = (rotate = 0): Variants => ({
    hidden: { opacity: 0, scale: 0, rotate: rotate - 180 },
    show: { opacity: 1, scale: 1, rotate, transition: { ...springIn, delay } },
  });

  if (name === "focus") {
    return (
      <m.span aria-hidden="true" whileHover={hover} className="relative block size-14">
        <m.span variants={shape()} className="absolute inset-0 rounded-full bg-primary-light" />
        {/* Blue square spins into place */}
        <m.span
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: -135 },
            show: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 260, damping: 12, delay: delay + 0.25 },
            },
          }}
          className="absolute top-2 left-2 size-6 rounded-md bg-primary"
        />
      </m.span>
    );
  }

  if (name === "experience") {
    return (
      <m.span aria-hidden="true" whileHover={hover} className="relative block size-14">
        <m.span
          variants={shape(12)}
          className="absolute inset-0 rounded-lg bg-orange/15 lg:bg-orange-light"
        />
        {/* Orange ball rolls in from the left */}
        <m.span
          variants={{
            hidden: { opacity: 0, x: -28, rotate: -180, scale: 0.6 },
            show: {
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 200, damping: 13, delay: delay + 0.3 },
            },
          }}
          className="absolute top-6 left-6 size-7 rounded-full bg-orange"
        />
      </m.span>
    );
  }

  return (
    <m.span aria-hidden="true" whileHover={hover} className="relative block size-14">
      <m.span variants={shape()} className="absolute inset-0 rounded-xl bg-yellow-light" />
      {/* Mustard ball drops in with a bounce */}
      <m.span
        variants={{
          hidden: { opacity: 0, y: -36 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 520, damping: 11, delay: delay + 0.3 },
          },
        }}
        className="absolute top-7 left-2 size-5 rounded-full bg-mustard"
      />
    </m.span>
  );
}
