"use client";

import { m, type Transition } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { EASE_OUT_EXPO, EASE_OUT_SOFT, revealViewport } from "@/components/motion/Reveal";
import type { CollageColumn } from "@/data/people";
import { cn } from "@/lib/cn";

type PhotoCollageProps = {
  columns: CollageColumn[];
  className?: string;
};

type CssVars = CSSProperties & Record<`--${string}`, string>;

/** How far (deg) the group travels around the circle during the entrance. */
const ORBIT_ANGLE = 90;
/** Shared by the group and the photos' counter-rotation so they stay perfectly in sync. */
const orbitTransition: Transition = { duration: 1.8, ease: EASE_OUT_EXPO };
/** Cascade: delay between photos (s) and the scale each photo grows from. */
const CASCADE_STEP = 0.08;
const START_SCALE = 0.3;

/**
 * Staggered photo columns over a soft circle. Sizes come from the Figma frames and are passed
 * as CSS variables so one markup serves both the mobile and desktop proportions.
 *
 * Entrance only (then it stays still, like the Figma): the circle grows, the whole group
 * arrives orbiting clockwise around the circle's centre while each photo counter-rotates to
 * stay upright, and the photos grow from small to full size one after another (cascade).
 * Hover: gentle zoom.
 * Rotations are skipped under reduced motion (MotionConfig), leaving a simple fade.
 */
export function PhotoCollage({ columns, className }: PhotoCollageProps) {
  // Global index of the first photo in each column (pure — no mutation during render).
  const columnStart = columns.map((_, index) =>
    columns.slice(0, index).reduce((total, column) => total + column.photos.length, 0),
  );

  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: {} }}
      className={cn(
        "relative",
        // Narrower phones scale the whole collage down instead of overflowing.
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

      {/* Orbiting group — rotates around its own centre, which is the circle's centre */}
      <m.div
        variants={{
          hidden: { rotate: -ORBIT_ANGLE },
          // No staggerChildren here: it would also delay the counter-rotation and tilt the photos.
          show: { rotate: 0, transition: orbitTransition },
        }}
        // 12px gap reproduces the mobile frame's space-between spacing at 402px
        className="relative flex items-center justify-center gap-3 md:gap-4"
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            style={
              {
                "--pt-m": `${column.offset.mobile}px`,
                "--pt-d": `${column.offset.desktop}px`,
              } as CssVars
            }
            className={cn(
              "relative flex flex-col gap-2 pt-(--pt-m) md:gap-[12.84px] md:pt-(--pt-d)",
              column.align === "end" ? "items-end" : "items-start",
            )}
          >
            {column.photos.map((photo, indexInColumn) => {
              const cascadeDelay = 0.1 + (columnStart[columnIndex] + indexInColumn) * CASCADE_STEP;
              return (
                // Layer 1 — counter-rotation, perfectly synced with the group: keeps the photo upright
                <m.div
                  key={photo.src}
                  variants={{
                    hidden: { rotate: ORBIT_ANGLE },
                    show: { rotate: 0, transition: orbitTransition },
                  }}
                >
                  {/* Layer 2 — cascade: grows from small to full size, one photo after another */}
                  <m.div
                    variants={{
                      hidden: { opacity: 0, scale: START_SCALE },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          opacity: { duration: 0.4, delay: cascadeDelay },
                          scale: { duration: 1, delay: cascadeDelay, ease: EASE_OUT_EXPO },
                        },
                      },
                    }}
                  >
                    {/* Layer 3 — hover zoom */}
                    <m.div
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
                          } as CssVars
                        }
                        className="h-(--h-m) w-(--w-m) object-cover md:h-(--h-d) md:w-(--w-d)"
                      />
                    </m.div>
                  </m.div>
                </m.div>
              );
            })}
          </div>
        ))}
      </m.div>
    </m.div>
  );
}
