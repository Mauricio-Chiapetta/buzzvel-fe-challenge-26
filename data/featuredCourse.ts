import type { Localized } from "@/i18n/types";
import type { ImageAsset, LinkItem } from "@/types/content";

export type CategoryId = "product-design" | "technology" | "business" | "creative";

export type Course = {
  categoryId: CategoryId;
  eyebrow: string;
  title: string;
  description: string;
  instructor: { name: string; role: string };
  tags: string[];
  image: ImageAsset;
};

export type FeaturedCourseContent = {
  badge: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** Course shown before the visitor picks a category (the one in the Figma design). */
  defaultCategory: CategoryId;
  courses: Record<CategoryId, Course>;
};

/*
 * Author addition (not in the Figma): each category card selects its own featured course.
 * Product Design is the original Figma content; the other three are mock courses reusing
 * photos already in the project.
 */
const images = {
  "product-design": { src: "/images/featured/design-course.jpg", width: 700, height: 500 },
  technology: { src: "/images/people/person-08.jpg", width: 1880, height: 1255 },
  business: { src: "/images/people/person-02.jpg", width: 1880, height: 1253 },
  creative: { src: "/images/people/person-04.jpg", width: 868, height: 1300 },
} satisfies Record<CategoryId, Omit<ImageAsset, "alt">>;

export const featuredCourse: Localized<FeaturedCourseContent> = {
  en: {
    badge: "Featured course",
    // No course detail page exists — "View course" leads to the contact form to enroll.
    primaryCta: { label: "View course", href: "#contact" },
    secondaryCta: { label: "Browse all courses", href: "#courses" },
    defaultCategory: "product-design",
    courses: {
      "product-design": {
        categoryId: "product-design",
        eyebrow: "Most popular this month",
        title: "Designing products people understand.",
        description:
          "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
        instructor: { name: "Maya Chen", role: "Senior Product Designer" },
        tags: ["8 lessons", "2h 40min", "Intermediate"],
        image: {
          ...images["product-design"],
          alt: "Product design student sketching interface ideas at a desk covered in paper prototypes and material samples",
        },
      },
      technology: {
        categoryId: "technology",
        eyebrow: "Most popular in Technology",
        title: "Building web apps that just work.",
        description:
          "Understand how modern web products are built — from components and APIs to testing and deployment — and make better decisions alongside your engineering team.",
        instructor: { name: "Lucas Ferreira", role: "Staff Software Engineer" },
        tags: ["10 lessons", "3h 15min", "Intermediate"],
        image: { ...images.technology, alt: "Student following a live online class on a desktop computer" },
      },
      business: {
        categoryId: "business",
        eyebrow: "Most popular in Business",
        title: "Making better decisions with data.",
        description:
          "Learn to frame the right questions, read the numbers that matter and turn insights into clear decisions your whole team can stand behind.",
        instructor: { name: "Priya Raman", role: "Head of Strategy" },
        tags: ["6 lessons", "1h 50min", "Beginner"],
        image: { ...images.business, alt: "Team of learners discussing a project together around a laptop" },
      },
      creative: {
        categoryId: "creative",
        eyebrow: "Most popular in Creative",
        title: "Telling stories people remember.",
        description:
          "Explore narrative, rhythm and visual craft to communicate ideas that stick — whether you write, film, design or perform.",
        instructor: { name: "Hana Sato", role: "Creative Director" },
        tags: ["7 lessons", "2h 10min", "All levels"],
        image: { ...images.creative, alt: "Two women rehearsing music together next to a bright window" },
      },
    },
  },
  pt: {
    badge: "Curso em destaque",
    primaryCta: { label: "Ver curso", href: "#contact" },
    secondaryCta: { label: "Ver todos os cursos", href: "#courses" },
    defaultCategory: "product-design",
    courses: {
      "product-design": {
        categoryId: "product-design",
        eyebrow: "Mais popular do mês",
        title: "Projetando produtos que as pessoas entendem.",
        description:
          "Aprenda a transformar fluxos complexos em experiências de produto simples e intencionais, com pesquisa, estrutura e um design de interação cuidadoso.",
        instructor: { name: "Maya Chen", role: "Product Designer Sênior" },
        tags: ["8 aulas", "2h 40min", "Intermediário"],
        image: {
          ...images["product-design"],
          alt: "Estudante de product design esboçando ideias de interface em uma mesa cheia de protótipos de papel e amostras de materiais",
        },
      },
      technology: {
        categoryId: "technology",
        eyebrow: "Mais popular em Tecnologia",
        title: "Criando aplicações web que simplesmente funcionam.",
        description:
          "Entenda como os produtos web modernos são construídos — de componentes e APIs a testes e deploy — e tome decisões melhores junto com o seu time de engenharia.",
        instructor: { name: "Lucas Ferreira", role: "Engenheiro de Software Staff" },
        tags: ["10 aulas", "3h 15min", "Intermediário"],
        image: { ...images.technology, alt: "Estudante acompanhando uma aula online ao vivo no computador" },
      },
      business: {
        categoryId: "business",
        eyebrow: "Mais popular em Negócios",
        title: "Tomando decisões melhores com dados.",
        description:
          "Aprenda a fazer as perguntas certas, ler os números que importam e transformar insights em decisões claras que todo o time apoia.",
        instructor: { name: "Priya Raman", role: "Head de Estratégia" },
        tags: ["6 aulas", "1h 50min", "Iniciante"],
        image: { ...images.business, alt: "Equipe de alunos discutindo um projeto em volta de um notebook" },
      },
      creative: {
        categoryId: "creative",
        eyebrow: "Mais popular em Criatividade",
        title: "Contando histórias que ficam na memória.",
        description:
          "Explore narrativa, ritmo e linguagem visual para comunicar ideias marcantes — seja escrevendo, filmando, desenhando ou se apresentando.",
        instructor: { name: "Hana Sato", role: "Diretora Criativa" },
        tags: ["7 aulas", "2h 10min", "Todos os níveis"],
        image: { ...images.creative, alt: "Duas mulheres ensaiando música juntas ao lado de uma janela iluminada" },
      },
    },
  },
};
