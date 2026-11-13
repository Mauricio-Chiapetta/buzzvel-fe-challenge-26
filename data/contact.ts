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

// The mobile Figma frame has this form in Portuguese; we use the English desktop copy everywhere.
export const contact: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
  info: [
    { icon: "chat", label: "Email", value: "contact@luma.com", href: "mailto:contact@luma.com" },
    { icon: "clock", label: "Response Time", value: "Up to 24 hours on business days" },
  ],
  form: {
    title: "Contact us",
    description: "Fill out the fields and we will get in touch.",
    fields: [
      { name: "name", label: "Full name", placeholder: "Your name", type: "text", autoComplete: "name" },
      {
        name: "email",
        label: "Email",
        placeholder: "youremail@example.com",
        type: "email",
        autoComplete: "email",
      },
      { name: "message", label: "Your question", placeholder: "Tell us how we can help...", type: "textarea" },
    ],
    submitLabel: "Send message",
    sendingLabel: "Sending...",
    successMessage: "Thanks! Your message was sent — we’ll get back to you within 24 hours.",
    errorMessage: "Something went wrong and your message wasn’t sent. Please try again.",
  },
};
