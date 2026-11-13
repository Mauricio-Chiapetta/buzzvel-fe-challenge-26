import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoCollage } from "@/components/ui/PhotoCollage";
import type { PeopleContent } from "@/data/people";

type PeopleProps = {
  content: PeopleContent;
};

export function People({ content }: PeopleProps) {
  return (
    <section id="people" aria-labelledby="people-title" className="overflow-x-clip bg-cream py-15 lg:py-25">
      <Container className="flex flex-col gap-8 md:gap-16 xl:flex-row xl:items-center xl:gap-15">
        <RevealGroup className="flex flex-col items-start gap-6 xl:flex-1 xl:gap-8">
          <RevealItem className="flex flex-col gap-2">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="people-title" className="font-display text-h3-mobile font-extrabold md:text-h3">
              {content.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-140 text-subtitle-1-mobile md:text-subtitle-1 md:text-ink-secondary">
              {content.description}
            </p>
          </RevealItem>
          <RevealItem>
            <ButtonLink href={content.cta.href} variant="secondary">
              {content.cta.label}
            </ButtonLink>
          </RevealItem>
        </RevealGroup>

        <PhotoCollage columns={content.collage} className="xl:flex-1" />
      </Container>
    </section>
  );
}
