import type { AnimatedIconName } from "@/components/icons/animated";
import type { Localized } from "@/i18n/types";
import type { CategoryId } from "./featuredCourse";

export type Category = {
  /** Selects the matching course in the Featured Course section. */
  id: CategoryId;
  /** Animated icon shown next to the number (author design addition — not in the Figma). */
  icon: AnimatedIconName;
  title: string;
  description: string;
  href: string;
};

export type CategoriesContent = {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  items: Category[];
};

const href = "#featured-course";

export const categories: Localized<CategoriesContent> = {
  en: {
    eyebrow: "Find your next skill",
    title: "Learn something worth knowing.",
    description: "Short, practical courses designed around skills you can put to work immediately.",
    linkLabel: "Explore",
    items: [
      { id: "product-design", icon: "pen-tool", title: "Product Design", description: "Turn complex problems into clear, useful experiences.", href },
      { id: "technology", icon: "cpu", title: "Technology", description: "Build a stronger understanding of the tools shaping digital products.", href },
      { id: "business", icon: "trending-up", title: "Business", description: "Develop practical skills for better decisions and stronger teams.", href },
      { id: "creative", icon: "sparkles", title: "Creative", description: "Explore new ways to communicate, create and tell stories.", href },
    ],
  },
  pt: {
    eyebrow: "Encontre sua próxima habilidade",
    title: "Aprenda algo que vale a pena.",
    description: "Cursos curtos e práticos, pensados em habilidades que você aplica imediatamente.",
    linkLabel: "Explorar",
    items: [
      { id: "product-design", icon: "pen-tool", title: "Product Design", description: "Transforme problemas complexos em experiências claras e úteis.", href },
      { id: "technology", icon: "cpu", title: "Tecnologia", description: "Entenda melhor as ferramentas que moldam os produtos digitais.", href },
      { id: "business", icon: "trending-up", title: "Negócios", description: "Desenvolva habilidades práticas para decisões melhores e equipes mais fortes.", href },
      { id: "creative", icon: "sparkles", title: "Criatividade", description: "Explore novas formas de comunicar, criar e contar histórias.", href },
    ],
  },
};
