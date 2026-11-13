import type { Person } from "@/types/content";

/** Mock learners shown in the avatar stacks (Hero and Final CTA) — names appear in the hover tooltip. */
export const learners: Person[] = [
  {
    name: "Sofia Martins",
    role: "UX Designer",
    image: { src: "/images/hero/avatar-1.jpg", alt: "", width: 80, height: 80 },
  },
  {
    name: "Daniel Okafor",
    role: "Software Engineer",
    image: { src: "/images/hero/avatar-2.jpg", alt: "", width: 80, height: 80 },
  },
  {
    name: "Kenji Watanabe",
    role: "Product Manager",
    image: { src: "/images/hero/avatar-3.jpg", alt: "", width: 80, height: 80 },
  },
  {
    name: "Amara Nwosu",
    role: "Data Analyst",
    image: { src: "/images/cta/avatar-4.jpg", alt: "", width: 80, height: 80 },
  },
];
