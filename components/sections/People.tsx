import { Reveal } from "@/components/motion/Reveal";
import { ScrollMaskBlock, ScrollMaskWords } from "@/components/motion/ScrollMask";
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
    <section
      id="people"
      aria-labelledby="people-title"
      className="overflow-x-clip bg-cream py-15 lg:py-25"
    >
      <Container className="flex flex-col gap-8 md:gap-16 xl:flex-row xl:items-center xl:gap-15">
        {/* Same text choreography as the other sections: eyebrow → title word by word →
            paragraph through masks, then the CTA rises. */}
        <div className="flex flex-col items-start gap-6 xl:flex-1 xl:gap-8">
          <div className="flex flex-col gap-2">
            <ScrollMaskBlock>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </ScrollMaskBlock>
            <h2
              id="people-title"
              aria-label={content.title}
              className="font-display text-h3-mobile font-extrabold md:text-h3"
            >
              <ScrollMaskWords text={content.title} delay={0.1} />
            </h2>
          </div>
          <ScrollMaskBlock delay={0.45}>
            <p className="max-w-140 text-subtitle-1-mobile md:text-subtitle-1 md:text-ink-secondary">
              {content.description}
            </p>
          </ScrollMaskBlock>
          <Reveal delay={0.6}>
            <ButtonLink href={content.cta.href} variant="secondary">
              {content.cta.label}
            </ButtonLink>
          </Reveal>
        </div>

        <PhotoCollage columns={content.collage} className="xl:flex-1" />
      </Container>
    </section>
  );
}
