"use client";

import { m, type HTMLMotionProps, type Variants } from "motion/react";

export const EASE_OUT_SOFT = [0.2, 0.7, 0.2, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export type RevealVariant = "up" | "scale" | "fade" | "left" | "right" | "line" | "soft";

const hiddenStates: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 24 },
  scale: { opacity: 0, y: 12, scale: 0.94 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  /** Horizontal line drawing itself from the left (set transform-origin: left on the element). */
  line: { scaleX: 0 },
  /** Long, smooth rise from below (expo ease-out) — used for cards. */
  soft: { opacity: 0, y: 64 },
};

const visible = { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 };

/** Shared viewport config: animate once, a bit after the element enters the screen. */
export const revealViewport = { once: true, margin: "0px 0px -10% 0px" } as const;

function variantsFor(variant: RevealVariant, delay = 0, duration = 0.7): Variants {
  return {
    hidden: hiddenStates[variant],
    show: {
      ...visible,
      transition: { duration, delay, ease: variant === "soft" ? EASE_OUT_EXPO : EASE_OUT_SOFT },
    },
  };
}

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  as?: "div" | "li";
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
};

/** Fades/slides its content in the first time it scrolls into view. */
export function Reveal({ as = "div", variant = "up", delay, duration, ...props }: RevealProps) {
  const Component = (as === "li" ? m.li : m.div) as typeof m.div;
  return (
    <Component
      variants={variantsFor(variant, delay, duration)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      {...props}
    />
  );
}

type RevealGroupProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  as?: "div" | "ul" | "ol";
  /** Delay between each child, in seconds. */
  stagger?: number;
  delay?: number;
};

const groupComponents = { div: m.div, ul: m.ul, ol: m.ol };

/** Parent that reveals its `RevealItem` children one after another. */
export function RevealGroup({ as = "div", stagger = 0.1, delay = 0, ...props }: RevealGroupProps) {
  const Component = groupComponents[as] as typeof m.div;
  return (
    <Component
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      {...props}
    />
  );
}

type RevealItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  as?: "div" | "li" | "span";
  variant?: RevealVariant;
  duration?: number;
};

const itemComponents = { div: m.div, li: m.li, span: m.span };

/** Child of `RevealGroup` — inherits the group's timing. */
export function RevealItem({ as = "div", variant = "up", duration, ...props }: RevealItemProps) {
  const Component = itemComponents[as] as typeof m.div;
  return <Component variants={variantsFor(variant, 0, duration)} {...props} />;
}
