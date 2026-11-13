"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { cn } from "@/lib/cn";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
};

/** Opacity of words that haven't been "read" yet. */
const DIM = 0.15;

/**
 * Scroll-linked text reveal (Awwwards classic): every word starts dimmed and lights up
 * one after another as the paragraph travels from the bottom of the screen to the middle.
 * The text is always in the DOM and readable; under reduced motion it renders fully lit.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts when the text's top hits 85% of the viewport, ends when its bottom reaches 45%.
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("relative", className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <Word
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
            static={reduceMotion ?? false}
          >
            {word}
          </Word>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  static: isStatic,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [DIM, 1]);
  return <m.span style={{ opacity: isStatic ? 1 : opacity }}>{children}</m.span>;
}
