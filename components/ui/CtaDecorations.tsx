"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

/**
 * Decorative shapes around the final CTA (from 1280px — the mobile frame has none, and at
 * 1024px the cube would touch the heading).
 * Positions come from the 1280px Figma frame: shapes on the left half are anchored with
 * `left`, shapes on the right half with `right`, so they hug the edges on wider screens.
 *
 * Motion: each shape drifts with the mouse at its own depth (parallax), on top of a slow CSS float.
 */
export function CtaDecorations() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.6 };
  const pointer: Pointer = { x: useSpring(rawX, spring), y: useSpring(rawY, spring) };

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section || reduceMotion) return;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !section) return;
      const rect = section.getBoundingClientRect();
      // -0.5 … 0.5 relative to the section centre.
      rawX.set((event.clientX - rect.left) / rect.width - 0.5);
      rawY.set((event.clientY - rect.top) / rect.height - 0.5);
    }
    function onLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY, reduceMotion]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {/* Left side */}
      <Shape pointer={pointer} depth={30} className="top-4 left-5.5" float="slow">
        <span className="block size-27 rounded-full border-2 border-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={45} className="top-[373px] left-14" float="slow" delay={-3}>
        <span className="block size-30 rounded-full bg-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={20} className="top-[235px] -left-7" float="sway" delay={-2}>
        <span className="block size-14 rotate-12 rounded-lg bg-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={25} className="top-[48px] left-[322px]" float="sway" delay={-5}>
        <span className="block size-14 rotate-12 rounded-lg border border-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={55} className="top-[214px] left-[141px]" float="normal">
        <Image src="/icons/decor/chat-bubble.svg" alt="" width={32} height={32} unoptimized />
      </Shape>
      <Shape pointer={pointer} depth={35} className="top-[369px] left-[281px]" float="sway" delay={-1}>
        <Image
          src="/icons/decor/shape-b.svg"
          alt=""
          width={83}
          height={83}
          unoptimized
          className="rotate-15"
        />
      </Shape>

      {/* Right side */}
      <Shape pointer={pointer} depth={20} className="-top-[13px] right-2.5" float="sway" delay={-4}>
        <span className="block size-[115px] rotate-12 rounded-lg bg-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={50} className="top-[43px] right-[371px]" float="normal" delay={-2}>
        <span className="block size-8 rounded-full border-2 border-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={40} className="top-[429px] right-10" float="normal" delay={-4}>
        <span className="block size-8 rounded-full border-2 border-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={30} className="top-[468px] right-44" float="slow">
        <span className="block size-10 rounded-full bg-orange-light" />
      </Shape>
      <Shape pointer={pointer} depth={45} className="top-[82px] right-[203px]" float="normal" delay={-1}>
        <Image src="/icons/decor/drop.svg" alt="" width={61} height={61} unoptimized />
      </Shape>
      <Shape pointer={pointer} depth={25} className="top-[180px] right-10" float="slow" delay={-6}>
        <Image src="/icons/decor/cube.svg" alt="" width={160} height={160} unoptimized />
      </Shape>
      <Shape pointer={pointer} depth={35} className="top-[381px] right-[269px]" float="normal" delay={-3}>
        <Image src="/icons/decor/frame.svg" alt="" width={48} height={48} unoptimized />
      </Shape>
    </div>
  );
}

const floatClasses = {
  normal: "motion-safe:animate-float",
  slow: "motion-safe:animate-float-slow",
  sway: "motion-safe:animate-sway",
};

type ShapeProps = {
  pointer: Pointer;
  /** Max drift in px when the mouse is at the section edge. */
  depth: number;
  /** Position classes (top/left/right) from the Figma frame. */
  className: string;
  float: keyof typeof floatClasses;
  /** Negative delay (s) desyncs the CSS float loops. */
  delay?: number;
  children: ReactNode;
};

/** Outer layer follows the mouse (Motion transform); inner layer floats (CSS transform). */
function Shape({ pointer, depth, className, float, delay = 0, children }: ShapeProps) {
  const x = useTransform(pointer.x, (value) => value * depth);
  const y = useTransform(pointer.y, (value) => value * depth);

  return (
    <m.div style={{ x, y }} className={cn("absolute", className)}>
      <div className={floatClasses[float]} style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </m.div>
  );
}
