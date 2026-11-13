import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";
import type { FooterContent } from "@/data/footer";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  const t = useTranslations("footer");
  return (
    <footer data-cursor-theme="inverse" className="bg-ink pt-15 pb-5 lg:pt-20 lg:pb-10">
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
                      className={[
                        "relative inline-block text-body-1 text-white-tertiary transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-white",
                        // Underline: draws in from the left on hover, exits to the right on leave
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current",
                        "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-divider pt-6 lg:mt-16 lg:flex-row lg:justify-between">
          <p className="text-center text-caption text-white lg:text-left lg:text-white-secondary">
            {t("copyright", { year: 2026 })}
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
