import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { authLinks, mainNav } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream">
      <Container className="flex h-17 items-center justify-between lg:grid lg:h-17.25 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-1 text-ink-secondary transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <Link
            href={authLinks.login.href}
            className="px-4 py-2.5 text-body-1 text-ink-secondary transition-colors hover:text-ink"
          >
            {authLinks.login.label}
          </Link>
          <ButtonLink href={authLinks.signup.href} size="md">
            {authLinks.signup.label}
          </ButtonLink>
        </div>

        <MobileMenu links={mainNav} login={authLinks.login} signup={authLinks.signup} />
      </Container>
    </header>
  );
}
