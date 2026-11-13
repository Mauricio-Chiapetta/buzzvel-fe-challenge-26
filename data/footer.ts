import type { LinkItem } from "@/types/content";

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
};

// Pages like Careers or Terms don't exist in this one-page build — they point to "#" placeholders.
export const footer: FooterContent = {
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
  copyright: "© 2026 Luma Learning",
};
