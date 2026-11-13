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

export const howItWorks: HowItWorksContent = {
  eyebrow: "How Luma works",
  title: "Less browsing. More learning.",
  // Desktop Figma labels all three as "Step 01"; mobile uses 01/02/03 — we number them sequentially.
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
};
