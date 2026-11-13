import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { authLinks, mainNav } from "@/data/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-17 items-center justify-between lg:grid lg:h-17.25 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <DesktopNav links={mainNav} />

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
    </HeaderShell>
  );
}
