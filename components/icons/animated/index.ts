import { CpuIcon } from "./cpu";
import { PenToolIcon } from "./pen-tool";
import { SparklesIcon } from "./sparkles";
import { TrendingUpIcon } from "./trending-up";

/** Imperative API shared by every lucide-animated icon. */
export type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export const animatedIcons = {
  "pen-tool": PenToolIcon,
  cpu: CpuIcon,
  "trending-up": TrendingUpIcon,
  sparkles: SparklesIcon,
} as const;

export type AnimatedIconName = keyof typeof animatedIcons;
