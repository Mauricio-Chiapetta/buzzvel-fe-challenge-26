import type { Localized } from "@/i18n/types";

export type ContactInfo = {
  icon: "chat" | "clock";
  label: string;
  value: string;
  href?: string;
};

export type ContactField = {
  name: "name" | "email" | "message";
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  info: ContactInfo[];
  form: {
    title: string;
    description: string;
    fields: ContactField[];
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
};

const email = { value: "contact@luma.com", href: "mailto:contact@luma.com" };

// The Portuguese copy reuses the exact strings from the mobile Figma frame
// ("Nome completo", "Seu nome", "Enviar mensagem"…).
export const contact: Localized<ContactContent> = {
  en: {
    eyebrow: "Contact",
    title: "Get in touch",
    description:
      "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
    info: [
      { icon: "chat", label: "Email", ...email },
      { icon: "clock", label: "Response Time", value: "Up to 24 hours on business days" },
    ],
    form: {
      title: "Contact us",
      description: "Fill out the fields and we will get in touch.",
      fields: [
        { name: "name", label: "Full name", placeholder: "Your name", type: "text", autoComplete: "name" },
        { name: "email", label: "Email", placeholder: "youremail@example.com", type: "email", autoComplete: "email" },
        { name: "message", label: "Your question", placeholder: "Tell us how we can help...", type: "textarea" },
      ],
      submitLabel: "Send message",
      sendingLabel: "Sending...",
      successMessage: "Thanks! Your message was sent — we’ll get back to you within 24 hours.",
      errorMessage: "Something went wrong and your message wasn’t sent. Please try again.",
    },
  },
  pt: {
    eyebrow: "Contato",
    title: "Fale com a gente",
    description:
      "Tem alguma dúvida? Estamos aqui para ajudar. Seja para encontrar o curso certo, aprender com o seu time ou ensinar na Luma, adoraríamos ouvir você.",
    info: [
      { icon: "chat", label: "E-mail", ...email },
      { icon: "clock", label: "Tempo de resposta", value: "Até 24 horas em dias úteis" },
    ],
    form: {
      title: "Fale conosco",
      description: "Preencha os campos e entraremos em contato.",
      fields: [
        { name: "name", label: "Nome completo", placeholder: "Seu nome", type: "text", autoComplete: "name" },
        { name: "email", label: "E-mail", placeholder: "seuemail@exemplo.com", type: "email", autoComplete: "email" },
        { name: "message", label: "Sua dúvida", placeholder: "Conte como podemos ajudar...", type: "textarea" },
      ],
      submitLabel: "Enviar mensagem",
      sendingLabel: "Enviando...",
      successMessage: "Obrigado! Sua mensagem foi enviada — responderemos em até 24 horas.",
      errorMessage: "Algo deu errado e sua mensagem não foi enviada. Tente novamente.",
    },
  },
};
