"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { EASE_OUT_SOFT, revealViewport } from "@/components/motion/Reveal";
import type { CollageColumn } from "@/data/people";
import { cn } from "@/lib/cn";

type PhotoCollageProps = {
  columns: CollageColumn[];
  className?: string;
};

type SizeVars = CSSProperties & Record<`--${string}`, string>;

/** How far (px) each column drifts while the collage crosses the viewport — alternating directions. */
const PARALLAX_DEPTH = [28, -20, 24, -28];

/**
 * Staggered photo columns over a soft circle. Sizes come from the Figma frames and are passed
 * as CSS variables so one markup serves both the mobile and desktop proportions.
 * Motion: photos pop in one after another, and columns drift at different speeds on scroll.
 */
export function PhotoCollage({ columns, className }: PhotoCollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <m.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className={cn(
        // 12px gap reproduces the mobile frame's space-between spacing at 402px;
        // narrower phones scale the whole collage down instead of overflowing.
        "relative flex items-center justify-center gap-3 md:gap-4",
        "max-[359px]:scale-[0.77] min-[360px]:max-[402px]:scale-[0.88]",
        className,
      )}
    >
      <m.div
        aria-hidden="true"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          show: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE_OUT_SOFT } },
        }}
        className="absolute top-1/2 left-1/2 size-82.5 -translate-1/2 rounded-full bg-primary-light md:size-125"
      />

      {columns.map((column, columnIndex) => (
        <ParallaxColumn
          key={columnIndex}
          progress={scrollYProgress}
          depth={reduceMotion ? 0 : PARALLAX_DEPTH[columnIndex % PARALLAX_DEPTH.length]}
          column={column}
        />
      ))}
    </m.div>
  );
}

function ParallaxColumn({
  column,
  progress,
  depth,
}: {
  column: CollageColumn;
  progress: MotionValue<number>;
  depth: number;
}) {
  const y = useTransform(progress, [0, 1], [depth, -depth]);

  return (
    <m.div
      style={
        {
          y,
          "--pt-m": `${column.offset.mobile}px`,
          "--pt-d": `${column.offset.desktop}px`,
        } as MotionStyle
      }
      className={cn(
        "relative flex flex-col gap-2 pt-(--pt-m) md:gap-[12.84px] md:pt-(--pt-d)",
        column.align === "end" ? "items-end" : "items-start",
      )}
    >
      {column.photos.map((photo) => (
        <m.div
          key={photo.src}
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
          }}
          whileHover={{ scale: 1.04 }}
          className="overflow-hidden rounded-[5px] shadow-photo md:rounded-sm"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.desktop[0] * 2}
            height={photo.desktop[1] * 2}
            sizes="(min-width: 768px) 140px, 96px"
            style={
              {
                "--w-m": `${photo.mobile[0]}px`,
                "--h-m": `${photo.mobile[1]}px`,
                "--w-d": `${photo.desktop[0]}px`,
                "--h-d": `${photo.desktop[1]}px`,
              } as SizeVars
            }
            className="h-(--h-m) w-(--w-m) object-cover md:h-(--h-d) md:w-(--w-d)"
          />
        </m.div>
      ))}
    </m.div>
  );
}
