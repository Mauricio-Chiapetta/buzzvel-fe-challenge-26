import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import type { FooterContent } from "@/data/footer";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-ink pt-15 pb-5 lg:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[416px_repeat(3,1fr)] lg:gap-8">
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-1">
            <Logo tone="light" className="self-start" />
            <p className="text-body-1 text-white-tertiary lg:max-w-60">{content.tagline}</p>
          </div>

          {content.columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2
                id={`footer-${column.title.toLowerCase()}`}
                className="text-overline font-semibold text-white-secondary uppercase"
              >
                {column.title}
              </h2>
              <ul className="flex flex-col gap-3 pt-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-1 text-white-tertiary transition-colors hover:text-white focus-visible:outline-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-divider pt-6 lg:mt-16">
          <p className="text-center text-caption text-white lg:text-left lg:text-white-secondary">
            {content.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
