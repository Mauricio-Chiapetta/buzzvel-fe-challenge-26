"use client";

import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import type { Person } from "@/types/content";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  people: Person[];
  /** `sm` = 32px (hero), `md` = 40px (final CTA). Both overlap by 8px. */
  size?: "sm" | "md";
  /** Border color — should match the background the stack sits on. */
  ringClassName?: string;
  className?: string;
};

const sizes = { sm: { px: 32, className: "size-8" }, md: { px: 40, className: "size-10" } };

const springConfig = { stiffness: 120, damping: 8 };

/**
 * Overlapping circular avatars. On hover the avatar lifts and a tooltip with the person's
 * name and role springs in, tilting as the cursor moves (inspired by Aceternity UI's
 * "Animated Tooltip", rebuilt with Motion).
 * The images are decorative (the surrounding copy carries the meaning), so the tooltip is a
 * visual-only enhancement and is hidden from assistive tech.
 */
export function AvatarStack({
  people,
  size = "sm",
  ringClassName = "border-cream",
  className,
}: AvatarStackProps) {
  const { px, className: sizeClassName } = sizes[size];
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Cursor offset from the avatar centre drives the tooltip's tilt and drift.
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-40, 40], [-25, 25]), springConfig);
  const translateX = useSpring(useTransform(x, [-40, 40], [-20, 20]), springConfig);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
  }

  return (
    <div className={cn("flex", className)}>
      {people.map((person, index) => (
        <div
          key={person.image.src}
          className={cn("relative", index > 0 && "-ml-2", hovered === index && "z-10")}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => {
            setHovered(null);
            x.set(0);
          }}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence>
            {hovered === index && (
              <m.div
                aria-hidden="true"
                initial={{ opacity: 0, y: 12, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 12 },
                }}
                exit={{ opacity: 0, y: 12, scale: 0.6, transition: { duration: 0.15 } }}
                style={{ rotate, x: translateX }}
                className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2"
              >
                <div className="relative flex flex-col items-center rounded-lg bg-ink px-3.5 py-2 whitespace-nowrap shadow-float">
                  {/* Brand-coloured accent line along the bottom edge */}
                  <span className="absolute inset-x-6 -bottom-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                  <span className="text-body-1 font-bold text-white">{person.name}</span>
                  <span className="text-caption text-white-tertiary">{person.role}</span>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <m.div
            animate={hovered === index ? { scale: 1.12, y: -2 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Image
              src={person.image.src}
              alt={person.image.alt}
              width={px}
              height={px}
              className={cn(
                "rounded-full border-2 bg-primary-light object-cover",
                sizeClassName,
                ringClassName,
              )}
            />
          </m.div>
        </div>
      ))}
    </div>
  );
}
