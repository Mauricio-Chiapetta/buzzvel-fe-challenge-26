import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Awwwards-style "mask reveal": each piece of text sits in an overflow-hidden window and slides
 * up from below it. Pure CSS (keyframes `mask-up` in globals.css), so it starts on first paint
 * without waiting for JavaScript, and is skipped entirely under prefers-reduced-motion.
 *
 * The mask gets a little bottom padding (cancelled by a negative margin) so descenders like
 * "g" and "y" are not clipped.
 */
const maskClass = "inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom";
const innerClass = "inline-block motion-safe:animate-mask-up";

type MaskWordsProps = {
  text: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  /** Delay between words, in ms. */
  stagger?: number;
};

/**
 * Splits `text` into words, each revealed through its own mask. Splitting by word (not line)
 * keeps it correct at every breakpoint, since line breaks change with the viewport width.
 * Render inside the heading and give the heading an `aria-label` with the full text —
 * the split spans are hidden from assistive tech so the title is read as one phrase.
 */
export function MaskWords({ text, delay = 0, stagger = 70 }: MaskWordsProps) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={maskClass}>
            <span className={innerClass} style={{ animationDelay: `${delay + index * stagger}ms` }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

type MaskBlockProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Reveals a whole block (eyebrow, paragraph…) through a single mask. */
export function MaskBlock({ children, delay = 0, className }: MaskBlockProps) {
  return (
    <div className={cn("overflow-hidden pb-[0.12em] -mb-[0.12em]", className)}>
      <div className="motion-safe:animate-mask-up" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}
