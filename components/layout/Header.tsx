import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import type { NavigationContent } from "@/data/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderShell } from "./HeaderShell";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";

type HeaderProps = {
  navigation: NavigationContent;
};

export function Header({ navigation }: HeaderProps) {
  const { main, login, signup } = navigation;

  return (
    <HeaderShell>
      <Container className="flex h-17 items-center justify-between lg:grid lg:h-17.25 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <DesktopNav links={main} />

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <LocaleSwitcher className="mr-2" />
          <Link
            href={login.href}
            className="rounded-lg px-4 py-2.5 text-body-1 text-ink-secondary transition-colors hover:text-ink"
          >
            {login.label}
          </Link>
          <ButtonLink href={signup.href} size="md">
            {signup.label}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher />
          <MobileMenu links={main} login={login} signup={signup} />
        </div>
      </Container>
    </HeaderShell>
  );
}
