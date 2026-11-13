import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContactContent } from "@/data/contact";

type ContactProps = {
  content: ContactContent;
};

const icons = {
  chat: { src: "/icons/chat.svg", size: 24 },
  clock: { src: "/icons/clock.svg", size: 20 },
};

export function Contact({ content }: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-15 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-8 lg:max-w-120 lg:flex-1 lg:gap-10">
          <SectionHeading
            id="contact-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            descriptionSize="sm"
          />

          <ul className="flex flex-col gap-4">
            {content.info.map((item) => {
              const icon = icons[item.icon];
              return (
                <li key={item.label} className="flex items-center gap-4 rounded-xl bg-cream p-4 lg:p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Image src={icon.src} alt="" width={icon.size} height={icon.size} unoptimized />
                  </span>
                  <span className="flex flex-col gap-0.5 text-body-1 lg:gap-1">
                    <span>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-primary underline-offset-2 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink-tertiary">{item.value}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <ContactForm content={content.form} />
      </Container>
    </section>
  );
}
