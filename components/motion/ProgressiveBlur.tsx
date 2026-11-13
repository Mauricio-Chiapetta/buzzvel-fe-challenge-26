"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Number of stacked blur layers — more layers = smoother ramp, but more GPU work. */
const LAYERS = 5;

/**
 * Progressive blur at the bottom edge of the viewport (Awwwards pattern, as on the Novaform
 * theme): content gets gradually blurrier as it approaches the bottom of the screen.
 * Built from stacked `backdrop-filter` layers, each masked to a band with a stronger blur.
 * It fades out at the very end of the page so the footer's last line stays readable.
 * Purely decorative: aria-hidden and pointer-events: none.
 */
export function ProgressiveBlur() {
  const { scrollYProgress } = useScroll();
  const [atEnd, setAtEnd] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress > 0.985;
    if (next !== atEnd) setAtEnd(next);
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-16 transition-opacity duration-500 md:h-28",
        atEnd ? "opacity-0" : "opacity-100",
      )}
    >
      {Array.from({ length: LAYERS }, (_, index) => {
        // Each layer covers a band that slides down the overlay; blur doubles every layer.
        const step = 100 / (LAYERS + 1);
        const start = index * step;
        const mask = `linear-gradient(to bottom, transparent ${start}%, black ${start + step}%, black ${start + step * 2}%, transparent ${start + step * 3}%)`;
        const lastMask = `linear-gradient(to bottom, transparent ${start}%, black ${start + step}%)`;
        const style: CSSProperties = {
          backdropFilter: `blur(${0.5 * 2 ** index}px)`,
          WebkitBackdropFilter: `blur(${0.5 * 2 ** index}px)`,
          maskImage: index === LAYERS - 1 ? lastMask : mask,
          WebkitMaskImage: index === LAYERS - 1 ? lastMask : mask,
        };
        return <div key={index} className="absolute inset-0" style={style} />;
      })}
    </div>
  );
}
