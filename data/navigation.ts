import type { LinkItem } from "@/types/content";

export type NavLink = LinkItem;

export const mainNav: NavLink[] = [
  { label: "Courses", href: "#courses" },
  { label: "For Teams", href: "#featured-course" },
  { label: "Community", href: "#people" },
  { label: "About", href: "#how-it-works" },
];

export const authLinks = {
  login: { label: "Log in", href: "#contact" },
  signup: { label: "Start learning", href: "#courses" },
} satisfies Record<string, NavLink>;
