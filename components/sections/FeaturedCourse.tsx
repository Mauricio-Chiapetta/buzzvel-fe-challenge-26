import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollMaskBlock, ScrollMaskWords } from "@/components/motion/ScrollMask";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { FeaturedCourseContent } from "@/data/featuredCourse";

type FeaturedCourseProps = {
  content: FeaturedCourseContent;
};

/*
 * Motion choreography (Awwwards-inspired): curtain clip-path image reveal → badge pops in →
 * eyebrow/title/paragraph/instructor through masks → tags spring in →
 * CTAs, with an underline-drawing secondary link.
 */
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
        <div className="relative lg:flex-1">
          <ClipReveal className="relative h-70 rounded-2xl md:h-96 lg:h-102">
            {/* Small drift on purpose: a taller layer forces object-cover to zoom in and crop
                the sides of the photo, losing the framing from the Figma design. */}
            <ParallaxLayer amount={14}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 530px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ParallaxLayer>
          </ClipReveal>
          <Reveal
            variant="scale"
            delay={0.7}
            className="absolute -top-3 -left-3 origin-bottom-left"
          >
            <p className="rounded-md bg-yellow px-3 py-1.5 text-overline font-semibold text-ink uppercase">
              {badge}
            </p>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="flex flex-col lg:flex-1">
          <ScrollMaskBlock delay={0.1}>
            <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
          </ScrollMaskBlock>
          <h2
            id="featured-course-title"
            aria-label={title}
            className="pt-4 font-display text-h3-mobile font-extrabold md:text-h3"
          >
            <ScrollMaskWords text={title} delay={0.2} />
          </h2>
          <ScrollMaskBlock delay={0.5} className="pt-5">
            <p className="text-body-1 lg:text-subtitle-2">{description}</p>
          </ScrollMaskBlock>
          <ScrollMaskBlock delay={0.8} className="pt-6">
            <p className="text-body-1 lg:text-subtitle-2">
              with {instructor.name} · {instructor.role}
            </p>
          </ScrollMaskBlock>

          <RevealGroup
            as="ul"
            stagger={0.08}
            delay={0.9}
            aria-label="Course details"
            className="flex flex-wrap gap-3 pt-6"
          >
            {tags.map((tag) => (
              <RevealItem
                as="li"
                variant="scale"
                key={tag}
                className="cursor-default rounded-lg border border-line px-3.5 py-1.5 text-body-1 transition-colors duration-300 hover:border-white hover:bg-white hover:text-primary"
              >
                {tag}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={1.1} className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
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
              {/* Underline draws from the left on hover */}
              <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:after:scale-x-100">
                {secondaryCta.label}
              </span>
              <Image
                src="/icons/arrow-right-light.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
