import type { Localized } from "@/i18n/types";
import type { Person } from "@/types/content";

const avatar = (src: string) => ({ src, alt: "", width: 80, height: 80 });

/** Mock learners shown in the avatar stacks (Hero and Final CTA) — names appear in the hover tooltip. */
export const learners: Localized<Person[]> = {
  en: [
    { name: "Sofia Martins", role: "UX Designer", image: avatar("/images/hero/avatar-1.jpg") },
    { name: "Daniel Okafor", role: "Software Engineer", image: avatar("/images/hero/avatar-2.jpg") },
    { name: "Kenji Watanabe", role: "Product Manager", image: avatar("/images/hero/avatar-3.jpg") },
    { name: "Amara Nwosu", role: "Data Analyst", image: avatar("/images/cta/avatar-4.jpg") },
  ],
  pt: [
    { name: "Sofia Martins", role: "UX Designer", image: avatar("/images/hero/avatar-1.jpg") },
    { name: "Daniel Okafor", role: "Engenheiro de Software", image: avatar("/images/hero/avatar-2.jpg") },
    { name: "Kenji Watanabe", role: "Gerente de Produto", image: avatar("/images/hero/avatar-3.jpg") },
    { name: "Amara Nwosu", role: "Analista de Dados", image: avatar("/images/cta/avatar-4.jpg") },
  ],
};
