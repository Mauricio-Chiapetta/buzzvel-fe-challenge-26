import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type NotFoundViewProps = {
  eyebrow: string;
  heading: string;
  description: string;
  backHome: string;
  /** Home of the current language ("/" or "/pt"). */
  homeHref: string;
  logoAlt: string;
};

/**
 * Branded 404 (not in the Figma): logo, big outlined "404" and a way back home, using the
 * same tokens as the landing page. Shared by the localized not-found and the global fallback.
 */
export function NotFoundView({ eyebrow, heading, description, backHome, homeHref, logoAlt }: NotFoundViewProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="mx-auto flex h-17 w-full max-w-[1280px] items-center px-5 md:px-10 xl:px-20">
        <Link href={homeHref} className="inline-flex">
          <Image src="/icons/logo.svg" alt={logoAlt} width={54} height={17} unoptimized />
        </Link>
      </header>

      <main
        id="main"
        className="mx-auto flex w-full max-w-160 flex-1 flex-col items-center justify-center px-5 pb-17 text-center"
      >
        <p
          aria-hidden="true"
          className="font-display text-[7.5rem] leading-none font-extrabold tracking-tight text-transparent [-webkit-text-stroke:2px_var(--color-primary)] md:text-[10rem] motion-safe:animate-fade-up"
        >
          404
        </p>
        <Eyebrow className="mt-6">{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-h2-mobile font-extrabold md:text-h2">{heading}</h1>
        <p className="mt-5 text-subtitle-1-mobile text-ink-secondary md:text-subtitle-1">{description}</p>
        <Link href={homeHref} data-cursor="wrap" className={cn(buttonClasses(), "mt-8")}>
          {backHome}
        </Link>
      </main>
    </div>
  );
}
