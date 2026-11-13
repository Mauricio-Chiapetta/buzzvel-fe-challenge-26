import type { Localized } from "@/i18n/types";
import type { ImageAsset, LinkItem, Person } from "@/types/content";
import { learners } from "./learners";

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** `count` is formatted per locale with Intl (24,000 / 24.000); copy lives in messages. */
  trust: { people: Person[]; count: number };
  image: ImageAsset;
  coursesBadge: { value: string; label: string };
  /** Formatted per locale (4.9 / 4,9). */
  rating: { value: number };
};

const image = { src: "/images/hero/hero-learner.jpg", width: 900, height: 1100 };

export const hero: Localized<HeroContent> = {
  en: {
    eyebrow: "Learn at your own pace",
    title: "Build skills that actually move you forward.",
    description:
      "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
    primaryCta: { label: "Explore courses", href: "#courses" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    trust: { people: learners.en.slice(0, 3), count: 24000 },
    image: { ...image, alt: "Smiling woman with glasses learning at her laptop in a bright office" },
    coursesBadge: { value: "120+", label: "expert-led courses" },
    rating: { value: 4.9 },
  },
  pt: {
    eyebrow: "Aprenda no seu ritmo",
    title: "Desenvolva habilidades que realmente fazem você avançar.",
    description:
      "Cursos práticos ensinados por quem faz o trabalho todos os dias. Aprenda design, tecnologia, negócios e muito mais — uma aula focada de cada vez.",
    primaryCta: { label: "Explorar cursos", href: "#courses" },
    secondaryCta: { label: "Veja como funciona", href: "#how-it-works" },
    trust: { people: learners.pt.slice(0, 3), count: 24000 },
    image: { ...image, alt: "Mulher sorridente de óculos estudando no notebook em um escritório iluminado" },
    coursesBadge: { value: "120+", label: "cursos com especialistas" },
    rating: { value: 4.9 },
  },
};
