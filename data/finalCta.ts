import type { ImageAsset, LinkItem } from "@/types/content";

export type FinalCtaContent = {
  title: string;
  description: string;
  avatars: ImageAsset[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export const finalCta: FinalCtaContent = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  avatars: [
    { src: "/images/hero/avatar-1.jpg", alt: "", width: 80, height: 80 },
    { src: "/images/hero/avatar-2.jpg", alt: "", width: 80, height: 80 },
    { src: "/images/hero/avatar-3.jpg", alt: "", width: 80, height: 80 },
    { src: "/images/cta/avatar-4.jpg", alt: "", width: 80, height: 80 },
  ],
  primaryCta: { label: "Explore all courses", href: "#courses" },
  secondaryCta: { label: "Join Luma", href: "#contact" },
};
