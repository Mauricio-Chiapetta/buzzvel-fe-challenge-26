export type Category = {
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
      title: "Product Design",
      description: "Turn complex problems into clear, useful experiences.",
      href: "#featured-course",
    },
    {
      title: "Technology",
      description: "Build a stronger understanding of the tools shaping digital products.",
      href: "#featured-course",
    },
    {
      title: "Business",
      description: "Develop practical skills for better decisions and stronger teams.",
      href: "#featured-course",
    },
    {
      title: "Creative",
      description: "Explore new ways to communicate, create and tell stories.",
      href: "#featured-course",
    },
  ],
};
