import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/i18n/types";
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

/** Alt text per photo, in collage order. */
const alts: Localized<string[]> = {
  en: [
    "Young student waving at a video call from her desk",
    "Group of learners studying together around a laptop",
    "Teenager in a hoodie reading a book in a library",
    "Two women practising music by a bright window",
    "Man taking notes while reading at home",
    "Graduate in cap and gown holding a diploma",
    "Woman working on a laptop in a minimalist home office",
    "Student attending an online class on a desktop computer",
    "Smiling student with curly hair holding notebooks outdoors",
    "Student in a hijab holding a coffee and books on campus",
  ],
  pt: [
    "Jovem estudante acenando em uma videochamada na escrivaninha",
    "Grupo de alunos estudando juntos em volta de um notebook",
    "Adolescente de moletom lendo um livro em uma biblioteca",
    "Duas mulheres praticando música perto de uma janela iluminada",
    "Homem fazendo anotações enquanto lê em casa",
    "Formando de beca e capelo segurando o diploma",
    "Mulher trabalhando no notebook em um home office minimalista",
    "Estudante assistindo a uma aula online no computador",
    "Estudante sorridente de cabelo cacheado segurando cadernos ao ar livre",
    "Estudante de hijab segurando um café e livros no campus",
  ],
};

/** Layout from the Figma frames (shared by both locales); only the alt text changes. */
function collage(locale: Locale): CollageColumn[] {
  const alt = (n: number) => alts[locale][n - 1];
  return [
    {
      offset: { mobile: 48, desktop: 64 },
      align: "end",
      photos: [
        { src: img(1), alt: alt(1), mobile: [72, 96], desktop: [103, 154] },
        { src: img(2), alt: alt(2), mobile: [94, 129], desktop: [138, 207] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 26 },
      align: "start",
      photos: [
        { src: img(3), alt: alt(3), mobile: [72, 106], desktop: [103, 170] },
        { src: img(4), alt: alt(4), mobile: [72, 107.5], desktop: [103, 172.5] },
        { src: img(5), alt: alt(5), mobile: [72, 80], desktop: [103, 128] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 0 },
      align: "start",
      photos: [
        { src: img(6), alt: alt(6), mobile: [72, 85.5], desktop: [103, 137] },
        { src: img(7), alt: alt(7), mobile: [72, 86], desktop: [103, 138] },
        { src: img(8), alt: alt(8), mobile: [72, 96], desktop: [103, 154] },
      ],
    },
    {
      offset: { mobile: 0, desktop: 0 },
      align: "start",
      photos: [
        { src: img(9), alt: alt(9), mobile: [88, 127.5], desktop: [128, 205] },
        { src: img(10), alt: alt(10), mobile: [72, 82.5], desktop: [103, 132] },
      ],
    },
  ];
}

// The description is placeholder copy kept exactly as provided in the design (lorem ipsum in both).
const description =
  "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.";

export const people: Localized<PeopleContent> = {
  en: {
    eyebrow: "The people",
    title: "Meet international students & teachers",
    description,
    cta: { label: "Explore teachers and students", href: "#contact" },
    collage: collage("en"),
  },
  pt: {
    eyebrow: "As pessoas",
    title: "Conheça alunos e professores do mundo todo",
    description,
    cta: { label: "Conhecer professores e alunos", href: "#contact" },
    collage: collage("pt"),
  },
};
