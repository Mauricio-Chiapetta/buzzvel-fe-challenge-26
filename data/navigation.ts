import type { Localized } from "@/i18n/types";
import type { LinkItem } from "@/types/content";

export type NavLink = LinkItem;

export type NavigationContent = {
  main: NavLink[];
  login: NavLink;
  signup: NavLink;
};

export const navigation: Localized<NavigationContent> = {
  en: {
    main: [
      { label: "Courses", href: "#courses" },
      { label: "For Teams", href: "#featured-course" },
      { label: "Community", href: "#people" },
      { label: "About", href: "#how-it-works" },
    ],
    login: { label: "Log in", href: "#contact" },
    signup: { label: "Start learning", href: "#courses" },
  },
  pt: {
    main: [
      { label: "Cursos", href: "#courses" },
      { label: "Para equipes", href: "#featured-course" },
      { label: "Comunidade", href: "#people" },
      { label: "Sobre", href: "#how-it-works" },
    ],
    login: { label: "Entrar", href: "#contact" },
    signup: { label: "Começar a aprender", href: "#courses" },
  },
};
