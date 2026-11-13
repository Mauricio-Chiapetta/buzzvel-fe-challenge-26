import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CtaDecorations } from "@/components/ui/CtaDecorations";
import type { FinalCtaContent } from "@/data/finalCta";

type FinalCtaProps = {
  content: FinalCtaContent;
};

export function FinalCta({ content }: FinalCtaProps) {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-yellow-light py-15 lg:py-25"
    >
      <CtaDecorations />

      <Container className="relative">
        <div className="mx-auto flex max-w-180 flex-col items-center text-center lg:px-8">
        <AvatarStack avatars={content.avatars} size="md" ringClassName="border-yellow" />
        <h2
          id="final-cta-title"
          className="pt-8 font-display text-h2-mobile font-extrabold md:text-h2"
        >
          {content.title}
        </h2>
        <p className="pt-4 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
          {content.description}
        </p>
        <div className="flex w-full flex-col gap-3 pt-10 sm:w-auto sm:flex-row">
          <ButtonLink href={content.primaryCta.href} className="w-full sm:w-auto">
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
        </div>
      </Container>
    </section>
  );
}
