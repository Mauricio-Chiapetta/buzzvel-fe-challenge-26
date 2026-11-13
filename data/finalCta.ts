import type { Localized } from "@/i18n/types";
import type { LinkItem, Person } from "@/types/content";
import { learners } from "./learners";

export type FinalCtaContent = {
  title: string;
  description: string;
  people: Person[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export const finalCta: Localized<FinalCtaContent> = {
  en: {
    title: "What will you learn next?",
    description: "Start with one course. Build from there.",
    people: learners.en,
    primaryCta: { label: "Explore all courses", href: "#courses" },
    secondaryCta: { label: "Join Luma", href: "#contact" },
  },
  pt: {
    title: "O que você vai aprender agora?",
    description: "Comece com um curso. E evolua a partir dele.",
    people: learners.pt,
    primaryCta: { label: "Explorar todos os cursos", href: "#courses" },
    secondaryCta: { label: "Entrar na Luma", href: "#contact" },
  },
};
