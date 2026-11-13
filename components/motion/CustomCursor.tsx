"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Elements the ring wraps itself around (buttons and button-like links). */
const WRAP_TARGETS = "button, [data-cursor='wrap']";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

const RING_SIZE = 26;
/** Extra space between the ring and the wrapped element's edge. */
const WRAP_PADDING = 3;
/** How much the wrapped ring follows the pointer inside the element (magnetic feel). */
const MAGNET = 0.12;
/**
 * The free ring sits slightly down-right of the pointer (towards the arrow's body) instead of
 * dead-centre on the hotspot, so it trails the native cursor rather than framing its tip.
 */
const FREE_OFFSET = { x: 0, y: 0 };

const spring = { stiffness: 380, damping: 32, mass: 0.6 };

/**
 * Custom cursor ring in the brand colour (author addition). The native cursor stays visible;
 * a ring trails it with a spring and, over buttons / button-like links, morphs into an outline
 * of the element (position, size and border radius) — the "wrapping" cursor seen on many
 * award-winning sites. Yellow over blue/dark areas marked with `data-cursor-theme="inverse"`,
 * hidden over text fields. Mouse/trackpad only; disabled under reduced motion.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  // Ring centre, size and corner radius — all spring-animated.
  const x = useSpring(useMotionValue(-100), spring);
  const y = useSpring(useMotionValue(-100), spring);
  const width = useSpring(useMotionValue(RING_SIZE), spring);
  const height = useSpring(useMotionValue(RING_SIZE), spring);
  const radius = useSpring(useMotionValue(RING_SIZE / 2), spring);

  const [visible, setVisible] = useState(false);
  const [wrapping, setWrapping] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [inverse, setInverse] = useState(false);
  const [overText, setOverText] = useState(false);

  const target = useRef<HTMLElement | null>(null);
  const pointer = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    /** Positions the ring: around the hovered element, or centred on the pointer. */
    function update() {
      const element = target.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const centreX = rect.left + rect.width / 2;
        const centreY = rect.top + rect.height / 2;
        x.set(centreX + (pointer.current.x - centreX) * MAGNET);
        y.set(centreY + (pointer.current.y - centreY) * MAGNET);
        width.set(rect.width + WRAP_PADDING * 2);
        height.set(rect.height + WRAP_PADDING * 2);
        const elementRadius = parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0;
        radius.set(Math.min(elementRadius + WRAP_PADDING, (rect.height + WRAP_PADDING * 2) / 2));
      } else {
        x.set(pointer.current.x + FREE_OFFSET.x);
        y.set(pointer.current.y + FREE_OFFSET.y);
        width.set(RING_SIZE);
        height.set(RING_SIZE);
        radius.set(RING_SIZE / 2);
      }
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      pointer.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      update();
    }

    function onOver(event: PointerEvent) {
      const element = event.target as Element | null;
      if (!element?.closest) return;
      const wrapTarget = element.closest<HTMLElement>(WRAP_TARGETS);
      target.current = wrapTarget;
      setWrapping(Boolean(wrapTarget));
      setOverText(Boolean(element.closest(TEXT_FIELDS)));
      setInverse(Boolean(element.closest("[data-cursor-theme='inverse']")));
      update();
    }

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    // Wrapped elements move while scrolling — keep the outline glued to them.
    const onScroll = () => update();

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, width, height, radius]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ x, y, width, height, borderRadius: radius, translateX: "-50%", translateY: "-50%" }}
      animate={{
        opacity: !visible || overText ? 0 : 1,
        scale: pressed ? (wrapping ? 0.96 : 0.8) : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-100 border-[1.5px] transition-colors duration-300",
        inverse ? "border-yellow" : "border-primary",
      )}
    />
  );
}
