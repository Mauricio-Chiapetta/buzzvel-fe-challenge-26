import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";
import { Container } from "@/components/ui/Container";
import type { TestimonialContent } from "@/data/testimonial";

type TestimonialProps = {
  content: TestimonialContent;
};

export function Testimonial({ content }: TestimonialProps) {
  const { quote, author, stats } = content;
  const t = useTranslations("testimonial");
  // Intl number formatting per locale: 24K / 24 mil, 92% / 92 %
  const format = useFormatter();
  const formatStat = (stat: TestimonialContent["stats"][number]) =>
    format.number(stat.value, {
      notation: stat.style === "compact" ? "compact" : "standard",
      style: stat.style === "percent" ? "percent" : "decimal",
    }) + (stat.suffix ?? "");

  return (
    <section aria-label={t("label")} className="bg-white py-15 lg:py-25">
      <Container className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <figure className="flex max-w-150 flex-col">
          <Reveal variant="scale" className="self-start">
            <Image src="/icons/quote.svg" alt="" width={24} height={22} unoptimized />
          </Reveal>
          {/* Words light up one by one as the quote scrolls up the screen */}
          <blockquote className="pt-4 font-display text-quote-mobile font-semibold lg:text-quote">
            <ScrollRevealText text={quote} />
          </blockquote>
          <figcaption className="pt-8">
            <Reveal delay={0.1} className="flex items-center gap-4">
              <Image
                src={author.avatar.src}
                alt={author.avatar.alt}
                width={48}
                height={48}
                className="size-12 rounded-full bg-primary-light object-cover"
              />
              <span className="flex flex-col">
                <span className="text-subtitle-2 font-bold">{author.name}</span>
                <span className="text-body-1 text-ink-secondary">{author.role}</span>
              </span>
            </Reveal>
          </figcaption>
        </figure>

        <RevealGroup
          as="ul"
          stagger={0.15}
          delay={0.1}
          className="flex gap-2 lg:w-100 lg:shrink-0 lg:flex-col lg:gap-5 lg:border-l lg:border-line lg:pl-12"
        >
          {stats.map((stat) => (
            <RevealItem as="li" key={stat.label} className="flex flex-1 flex-col">
              <CountUp
                value={formatStat(stat)}
                className="font-display text-h1-mobile font-extrabold text-primary lg:text-h1"
              />
              <span className="pt-1 text-body-1 text-ink-tertiary">{stat.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
