import type { AnimatedIconName } from "@/components/icons/animated";

export type Category = {
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

export const categories: CategoriesContent = {
  eyebrow: "Find your next skill",
  title: "Learn something worth knowing.",
  description: "Short, practical courses designed around skills you can put to work immediately.",
  linkLabel: "Explore",
  items: [
    {
      icon: "pen-tool",
      title: "Product Design",
      description: "Turn complex problems into clear, useful experiences.",
      href: "#featured-course",
    },
    {
      icon: "cpu",
      title: "Technology",
      description: "Build a stronger understanding of the tools shaping digital products.",
      href: "#featured-course",
    },
    {
      icon: "trending-up",
      title: "Business",
      description: "Develop practical skills for better decisions and stronger teams.",
      href: "#featured-course",
    },
    {
      icon: "sparkles",
      title: "Creative",
      description: "Explore new ways to communicate, create and tell stories.",
      href: "#featured-course",
    },
  ],
};
