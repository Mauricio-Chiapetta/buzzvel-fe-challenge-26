import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { FeaturedCourseContent } from "@/data/featuredCourse";

type FeaturedCourseProps = {
  content: FeaturedCourseContent;
};

export function FeaturedCourse({ content }: FeaturedCourseProps) {
  const { badge, eyebrow, title, description, instructor, tags, primaryCta, secondaryCta, image } =
    content;

  return (
    <section
      id="featured-course"
      aria-labelledby="featured-course-title"
      className="bg-primary py-15 text-white lg:py-25"
    >
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-15">
        {/* Image with "Featured course" badge */}
        <Reveal variant="left" className="relative lg:flex-1">
          <div className="relative h-70 overflow-hidden rounded-2xl md:h-96 lg:h-102">
            <ParallaxLayer amount={50}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 530px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ParallaxLayer>
          </div>
          <p className="absolute -top-3 -left-3 rounded-md bg-yellow px-3 py-1.5 text-overline font-semibold text-ink uppercase">
            {badge}
          </p>
        </Reveal>

        {/* Copy */}
        <RevealGroup stagger={0.08} delay={0.15} className="flex flex-col lg:flex-1">
          <RevealItem>
            <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="featured-course-title"
              className="pt-4 font-display text-h3-mobile font-extrabold md:text-h3"
            >
              {title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="pt-5 text-body-1 lg:text-subtitle-2">{description}</p>
          </RevealItem>
          <RevealItem>
            <p className="pt-6 text-body-1 lg:text-subtitle-2">
              with {instructor.name} · {instructor.role}
            </p>
          </RevealItem>

          <RevealItem>
            <ul aria-label="Course details" className="flex flex-wrap gap-3 pt-6">
              {tags.map((tag) => (
                <li key={tag} className="rounded-lg border border-line px-3.5 py-1.5 text-body-1">
                  {tag}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
            <ButtonLink
              href={primaryCta.href}
              variant="accent"
              className="w-full focus-visible:outline-white sm:w-auto"
            >
              {primaryCta.label}
            </ButtonLink>
            <Link
              href={secondaryCta.href}
              className="group flex items-center justify-center gap-2 px-4 py-3.5 text-body-1 font-bold text-white-secondary transition-colors hover:text-white focus-visible:outline-white"
            >
              {secondaryCta.label}
              <Image
                src="/icons/arrow-right-light.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="transition-transform motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
