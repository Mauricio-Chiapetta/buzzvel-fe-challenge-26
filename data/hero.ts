import type { ImageAsset, LinkItem } from "@/types/content";

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  trust: {
    avatars: ImageAsset[];
    highlight: string;
    label: string;
  };
  image: ImageAsset;
  coursesBadge: { value: string; label: string };
  rating: { value: number; label: string };
};

export const hero: HeroContent = {
  eyebrow: "Learn at your own pace",
  title: "Build skills that actually move you forward.",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  primaryCta: { label: "Explore courses", href: "#courses" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  trust: {
    avatars: [
      { src: "/images/hero/avatar-1.png", alt: "", width: 80, height: 80 },
      { src: "/images/hero/avatar-2.png", alt: "", width: 80, height: 80 },
      { src: "/images/hero/avatar-3.png", alt: "", width: 80, height: 80 },
    ],
    highlight: "Trusted by 24,000+",
    label: "learners",
  },
  image: {
    src: "/images/hero/hero-learner.png",
    alt: "Smiling woman with glasses learning at her laptop in a bright office",
    width: 900,
    height: 1100,
  },
  coursesBadge: { value: "120+", label: "expert-led courses" },
  rating: { value: 4.9, label: "avg rating" },
};
