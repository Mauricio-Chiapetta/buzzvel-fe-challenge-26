"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT_SOFT, revealViewport } from "./Reveal";

type CountUpProps = {
  /** Display value such as "24K+", "120+" or "92%". */
  value: string;
  className?: string;
};

/** Splits "24K+" into prefix "", number 24, suffix "K+". */
function parse(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return { prefix, target: Number(number), decimals: number.split(".")[1]?.length ?? 0, suffix };
}

/**
 * Counts from 0 up to the number in `value` when it scrolls into view.
 * The server renders the final value (no-JS / SEO safe) and screen readers always get the
 * final value from the visually hidden copy — the animated digits are aria-hidden.
 * Meant to sit inside a Reveal so the reset to 0 happens while it is still transparent.
 */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, revealViewport);
  const reduceMotion = useReducedMotion();
  const parsed = parse(value);

  useEffect(() => {
    const element = ref.current;
    if (!inView || reduceMotion || !parsed || !element) return;

    const { prefix, target, decimals, suffix } = parsed;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE_OUT_SOFT,
      // Writing to the DOM directly avoids re-rendering React on every frame.
      onUpdate: (latest) => {
        element.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
    // `parsed` is derived from `value`, which is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
