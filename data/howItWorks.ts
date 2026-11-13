import type { Localized } from "@/i18n/types";

export type StepIcon = "focus" | "experience" | "practice";

export type Step = {
  icon: StepIcon;
  title: string;
  description: string;
};

export type HowItWorksContent = {
  eyebrow: string;
  title: string;
  steps: Step[];
};

// Desktop Figma labels all three as "Step 01"; mobile uses 01/02/03 — we number them sequentially.
export const howItWorks: Localized<HowItWorksContent> = {
  en: {
    eyebrow: "How Luma works",
    title: "Less browsing. More learning.",
    steps: [
      {
        icon: "focus",
        title: "Choose your focus",
        description: "Find courses based on the skill you want to build, not endless content categories.",
      },
      {
        icon: "experience",
        title: "Learn from experience",
        description: "Follow concise lessons created by professionals who use these skills.",
      },
      {
        icon: "practice",
        title: "Put it into practice",
        description: "Every course includes practical exercises designed to turn knowledge into action.",
      },
    ],
  },
  pt: {
    eyebrow: "Como a Luma funciona",
    title: "Menos procura. Mais aprendizado.",
    steps: [
      {
        icon: "focus",
        title: "Escolha seu foco",
        description:
          "Encontre cursos pela habilidade que você quer desenvolver, e não por categorias infinitas de conteúdo.",
      },
      {
        icon: "experience",
        title: "Aprenda com a experiência",
        description: "Siga aulas objetivas criadas por profissionais que usam essas habilidades no dia a dia.",
      },
      {
        icon: "practice",
        title: "Coloque em prática",
        description: "Todo curso inclui exercícios práticos pensados para transformar conhecimento em ação.",
      },
    ],
  },
};
