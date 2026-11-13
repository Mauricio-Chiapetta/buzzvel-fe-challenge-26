import type { Localized } from "@/i18n/types";
import type { ImageAsset } from "@/types/content";

export type Stat = {
  /** Raw number, formatted per locale with Intl.NumberFormat. */
  value: number;
  /** `compact` → 24K / 24 mil · `standard` → 120 · `percent` → 92% */
  style: "compact" | "standard" | "percent";
  suffix?: string;
  label: string;
};

export type TestimonialContent = {
  quote: string;
  author: { name: string; role: string; avatar: ImageAsset };
  stats: Stat[];
};

const avatar = { src: "/images/testimonial/alex-morgan.jpg", alt: "", width: 200, height: 200 };

export const testimonial: Localized<TestimonialContent> = {
  en: {
    quote:
      "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
    author: { name: "Alex Morgan", role: "Product Manager", avatar },
    stats: [
      { value: 24000, style: "compact", suffix: "+", label: "active learners" },
      { value: 120, style: "standard", suffix: "+", label: "expert-led courses" },
      { value: 0.92, style: "percent", label: "complete their first course" },
    ],
  },
  pt: {
    quote:
      "As aulas são curtas o bastante para caber na minha semana, mas detalhadas o suficiente para eu sair com algo que realmente uso.",
    author: { name: "Alex Morgan", role: "Gerente de Produto", avatar },
    stats: [
      { value: 24000, style: "compact", suffix: "+", label: "alunos ativos" },
      { value: 120, style: "standard", suffix: "+", label: "cursos com especialistas" },
      { value: 0.92, style: "percent", label: "concluem o primeiro curso" },
    ],
  },
};
