import type { ImageAsset, LinkItem } from "@/types/content";

export type FeaturedCourseContent = {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  instructor: { name: string; role: string };
  tags: string[];
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  image: ImageAsset;
};

export const featuredCourse: FeaturedCourseContent = {
  badge: "Featured course",
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: { name: "Maya Chen", role: "Senior Product Designer" },
  tags: ["8 lessons", "2h 40min", "Intermediate"],
  // No course detail page exists — "View course" leads to the contact form to enroll.
  primaryCta: { label: "View course", href: "#contact" },
  secondaryCta: { label: "Browse all courses", href: "#courses" },
  image: {
    src: "/images/featured/design-course.jpg",
    alt: "Product design student sketching interface ideas at a desk covered in paper prototypes and material samples",
    width: 700,
    height: 500,
  },
};
