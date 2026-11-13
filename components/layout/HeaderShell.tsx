"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Sticky header wrapper that gets a translucent, blurred background and a shadow once the page scrolls. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 8;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-cream transition-[background-color,box-shadow] duration-300",
        "data-scrolled:bg-cream/85 data-scrolled:shadow-[0_8px_24px_-12px_rgb(23_27_44/0.18)] data-scrolled:backdrop-blur-md",
      )}
    >
      {children}
    </header>
  );
}
