import type { LinkItem, Person } from "@/types/content";
import { learners } from "./learners";

export type FinalCtaContent = {
  title: string;
  description: string;
  people: Person[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export const finalCta: FinalCtaContent = {
  title: "What will you learn next?",
  description: "Start with one course. Build from there.",
  people: learners,
  primaryCta: { label: "Explore all courses", href: "#courses" },
  secondaryCta: { label: "Join Luma", href: "#contact" },
};
