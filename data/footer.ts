import type { Localized } from "@/i18n/types";
import type { LinkItem } from "@/types/content";

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
};

// Pages like Careers or Terms don't exist in this one-page build — they point to "#" placeholders.
// The copyright line lives in messages (footer.copyright) so the year is interpolated.
export const footer: Localized<FooterContent> = {
  en: {
    tagline: "Practical learning for curious people.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Courses", href: "#courses" },
          { label: "Categories", href: "#courses" },
          { label: "Instructors", href: "#people" },
          { label: "For Teams", href: "#featured-course" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#how-it-works" },
          { label: "Careers", href: "#" },
          { label: "Journal", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#contact" },
          { label: "Contact", href: "#contact" },
          { label: "Terms", href: "#" },
          { label: "Privacy", href: "#" },
        ],
      },
    ],
  },
  pt: {
    tagline: "Aprendizado prático para pessoas curiosas.",
    columns: [
      {
        title: "Explorar",
        links: [
          { label: "Cursos", href: "#courses" },
          { label: "Categorias", href: "#courses" },
          { label: "Instrutores", href: "#people" },
          { label: "Para equipes", href: "#featured-course" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { label: "Sobre", href: "#how-it-works" },
          { label: "Carreiras", href: "#" },
          { label: "Blog", href: "#" },
        ],
      },
      {
        title: "Suporte",
        links: [
          { label: "Central de ajuda", href: "#contact" },
          { label: "Contato", href: "#contact" },
          { label: "Termos", href: "#" },
          { label: "Privacidade", href: "#" },
        ],
      },
    ],
  },
};
