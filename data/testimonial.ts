import type { ImageAsset } from "@/types/content";

export type Stat = {
  value: string;
  label: string;
};

export type TestimonialContent = {
  quote: string;
  author: { name: string; role: string; avatar: ImageAsset };
  stats: Stat[];
};

export const testimonial: TestimonialContent = {
  quote:
    "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
  author: {
    name: "Alex Morgan",
    role: "Product Manager",
    avatar: { src: "/images/testimonial/alex-morgan.jpg", alt: "", width: 200, height: 200 },
  },
  stats: [
    { value: "24K+", label: "active learners" },
    { value: "120+", label: "expert-led courses" },
    { value: "92%", label: "complete their first course" },
  ],
};
