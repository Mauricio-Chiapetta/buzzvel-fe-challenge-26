import type { LinkItem } from "@/types/content";

/** [width, height] in px — the collage uses different proportions on mobile and desktop (Figma). */
type Size = [number, number];

export type CollagePhoto = {
  src: string;
  alt: string;
  mobile: Size;
  desktop: Size;
};

export type CollageColumn = {
  /** Vertical offset of the column, in px. */
  offset: { mobile: number; desktop: number };
  align: "start" | "end";
  photos: CollagePhoto[];
};

export type PeopleContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: LinkItem;
  collage: CollageColumn[];
};

const img = (n: number) => `/images/people/person-${String(n).padStart(2, "0")}.jpg`;

export const people: PeopleContent = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  // Placeholder copy kept exactly as provided in the design.
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  cta: { label: "Explore teachers and students", href: "#contact" },
  collage: [
    {
      offset: { mobile: 48, desktop: 64 },
      align: "end",
      photos: [
        { src: img(1), alt: "Young student waving at a video call from her desk", mobile: [72, 96], desktop: [103, 154] },
        { src: img(2), alt: "Group of learners studying together around a laptop", mobile: [94, 129], desktop: [138, 207] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 26 },
      align: "start",
      photos: [
        { src: img(3), alt: "Teenager in a hoodie reading a book in a library", mobile: [72, 106], desktop: [103, 170] },
        { src: img(4), alt: "Two women practising music by a bright window", mobile: [72, 107.5], desktop: [103, 172.5] },
        { src: img(5), alt: "Man taking notes while reading at home", mobile: [72, 80], desktop: [103, 128] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 0 },
      align: "start",
      photos: [
        { src: img(6), alt: "Graduate in cap and gown holding a diploma", mobile: [72, 85.5], desktop: [103, 137] },
        { src: img(7), alt: "Woman working on a laptop in a minimalist home office", mobile: [72, 86], desktop: [103, 138] },
        { src: img(8), alt: "Student attending an online class on a desktop computer", mobile: [72, 96], desktop: [103, 154] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 0 },
      align: "start",
      photos: [
        { src: img(9), alt: "Smiling student with curly hair holding notebooks outdoors", mobile: [88, 127.5], desktop: [128, 205] },
        { src: img(10), alt: "Student in a hijab holding a coffee and books on campus", mobile: [72, 82.5], desktop: [103, 132] },
      ],
    },
  ],
};
