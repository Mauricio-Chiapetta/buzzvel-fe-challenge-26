"use client";

import { m } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { SKIP_INTRO_KEY } from "@/lib/intro";

const LETTERS = ["l", "u", "m", "a", "."];

/** Curtain ease: slow start, fast middle, soft landing. */
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;
/** Time on screen before the curtain leaves (letters have finished rising by then). */
const HOLD_MS = 1500;

/**
 * playing → curtain on screen, Hero entrance paused
 * leaving → curtain sliding away, Hero entrance running
 * done    → curtain removed
 */
type Phase = "playing" | "leaving" | "done";

/** Client-side navigations (e.g. a language switch without reload) never replay the intro. */
let played = false;

/**
 * Awwwards-style intro curtain (author addition). A brand-blue panel shows "luma." with the
 * letters rising through masks, then the panel slides up with a curved bottom edge, trailed by
 * a yellow layer, while the Hero entrance starts underneath.
 *
 * The phase lives in React state on a wrapper (`data-intro`), rendered as "playing" in the
 * server HTML so the curtain is there on first paint. CSS pauses the Hero's entrance (marked
 * `data-intro-wait`) while playing, so it starts from its first frame when the curtain leaves.
 * Skipped under prefers-reduced-motion (CSS), without JavaScript (<noscript> styles) and after a
 * language switch (inline script in the layout). Decorative: aria-hidden, no pointer events.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() => (played ? "done" : "playing"));

  useEffect(() => {
    played = true;
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem(SKIP_INTRO_KEY)) skip = true;
    } catch {}

    const timer = window.setTimeout(
      () => {
        // Consumed here (not above) so Strict Mode's double effect run still sees the flag.
        try {
          sessionStorage.removeItem(SKIP_INTRO_KEY);
        } catch {}
        setPhase((current) => (current !== "playing" ? current : skip ? "done" : "leaving"));
      },
      skip ? 0 : HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div data-intro={phase} className="contents">
      {phase !== "done" && <Curtain leaving={phase === "leaving"} onDone={() => setPhase("done")} />}
      {children}
    </div>
  );
}

function Curtain({ leaving, onDone }: { leaving: boolean; onDone: () => void }) {
  const curtain = (delay: number) => ({
    initial: { y: "0%" },
    animate: { y: leaving ? "-125%" : "0%" },
    transition: { duration: 1, ease: EASE_CURTAIN, delay },
  });

  return (
    <div data-intro-overlay aria-hidden="true" className="pointer-events-none fixed inset-0 z-70">
      {/* Accent layer: trails the main curtain, flashing a yellow curved edge */}
      <m.div
        {...curtain(0.1)}
        onAnimationComplete={() => leaving && onDone()}
        className="absolute inset-0 bg-yellow"
      >
        <div className="absolute top-full -left-[10%] h-[14vh] w-[120%] rounded-b-[50%] bg-yellow" />
      </m.div>

      <m.div {...curtain(0)} className="absolute inset-0 bg-primary">
        <div className="absolute top-full -left-[10%] h-[14vh] w-[120%] rounded-b-[50%] bg-primary" />

        <div className="flex h-full items-center justify-center">
          <p className="flex font-display text-[5.5rem] leading-none font-extrabold tracking-tight text-white md:text-[9rem]">
            {/* Each letter rises through its own mask, then leaves upwards through it */}
            {LETTERS.map((letter, index) => (
              <span key={letter} className="inline-block overflow-hidden pb-[0.08em]">
                <m.span
                  className={letter === "." ? "inline-block text-yellow" : "inline-block"}
                  initial={{ y: "110%" }}
                  animate={{ y: leaving ? "-110%" : "0%" }}
                  transition={
                    leaving
                      ? { duration: 0.5, ease: [0.7, 0, 0.84, 0], delay: index * 0.035 }
                      : { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 + index * 0.07 }
                  }
                >
                  {letter}
                </m.span>
              </span>
            ))}
          </p>
        </div>
      </m.div>
    </div>
  );
}
