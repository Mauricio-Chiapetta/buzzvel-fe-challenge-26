"use client";

import { useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { animatedIcons, type AnimatedIconHandle, type AnimatedIconName } from "@/components/icons/animated";

type CategoryCardProps = {
  index: number;
  icon: AnimatedIconName;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

/**
 * Numbered category card — the whole card is a single link.
 * The lucide-animated icon next to the number plays once when the card scrolls in
 * (staggered per card), and again on hover or keyboard focus of the card.
 *
 * Hover: soft lift, a spotlight that follows the cursor,
 * number/icon pills switch to the brand colour and the arrow slides.
 */
export function CategoryCard({ index, icon, title, description, href, linkLabel }: CategoryCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const Icon = animatedIcons[icon];
  const iconRef = useRef<AnimatedIconHandle>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  // Play once after the card's own entrance has mostly finished.
  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = window.setTimeout(() => iconRef.current?.startAnimation(), 600 + index * 150);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion, index]);

  const play = () => {
    if (!reduceMotion) iconRef.current?.startAnimation();
  };
  const reset = () => iconRef.current?.stopAnimation();

  // Spotlight position as CSS variables — no React re-render on mouse move.
  function trackPointer(event: MouseEvent<HTMLAnchorElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseEnter={play}
      onMouseLeave={reset}
      onMouseMove={trackPointer}
      onFocus={play}
      onBlur={reset}
      className={[
        "group relative isolate flex min-h-50 w-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-6 lg:min-h-65 lg:p-7",
        "transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-primary/30 motion-safe:hover:-translate-y-1.5",
        "focus-visible:border-primary/30",
      ].join(" ")}
    >
      {/* Cursor spotlight (behind the content, above the card background) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(49 87 246 / 0.09), transparent 70%)",
        }}
      />
      <div>
        <div aria-hidden="true" className="flex h-[46.5px] items-start gap-2 pt-0.5">
          <span className="inline-flex rounded-md bg-primary-light px-2 py-1 text-overline font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-focus-visible:bg-primary group-focus-visible:text-white">
            {number}
          </span>
          <Icon
            ref={iconRef}
            size={16}
            className="flex size-6 items-center justify-center rounded-md bg-primary-light text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-focus-visible:bg-primary group-focus-visible:text-white"
          />
        </div>
        <h3 className="font-display text-h5-mobile font-bold lg:text-h5">{title}</h3>
        <p className="pt-3 text-body-1 text-ink-tertiary">{description}</p>
      </div>

      <span className="flex items-center gap-2 pt-6 text-body-1 font-bold">
        {linkLabel}
        <Image
          src="/icons/arrow-right.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1.5"
        />
      </span>
    </Link>
  );
}
