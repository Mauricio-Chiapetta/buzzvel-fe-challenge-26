"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Loaded asynchronously so the animation engine stays out of the initial JS bundle.
const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * - `LazyMotion` + `m` components keep Motion's footprint small (features load on demand).
 * - `reducedMotion="user"` makes every Motion animation honour `prefers-reduced-motion`
 *   (transforms are skipped, only opacity fades remain).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
