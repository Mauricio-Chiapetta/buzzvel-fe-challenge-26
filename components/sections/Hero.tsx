import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StarRating } from "@/components/ui/StarRating";
import type { HeroContent } from "@/data/hero";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const { eyebrow, title, description, primaryCta, secondaryCta, trust, image, coursesBadge, rating } =
    content;

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-cream py-15 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start xl:gap-15">
        {/* Copy */}
        <div className="flex flex-1 flex-col">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="pt-4 font-display text-h1-mobile font-extrabold md:text-h3 xl:text-h1"
          >
            {title}
          </h1>
          <p className="max-w-120 pt-6 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
            {description}
          </p>

          <div className="flex flex-col gap-3 pt-8 sm:flex-row">
            <ButtonLink href={primaryCta.href} className="w-full sm:w-auto">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="flex items-center justify-center gap-3 pt-8 sm:justify-start">
            <AvatarStack avatars={trust.avatars} />
            <p className="text-body-1 text-ink-secondary">
              <strong className="font-bold text-ink">{trust.highlight}</strong> {trust.label}
            </p>
          </div>
        </div>

        {/* Visual — shown first on mobile, right column on desktop */}
        <div className="relative order-first mx-auto h-95 w-full max-w-90.5 shrink-0 md:h-130 md:max-w-125 lg:order-0 lg:mx-0 lg:w-125">
          <div
            aria-hidden="true"
            className="absolute top-6 -right-2.5 bottom-3.5 w-[271.5px] rounded-2xl bg-orange-light md:-right-9.75 md:bottom-7 md:w-22.25"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-3 -left-2.5 size-16 rounded-full bg-primary-light md:bottom-2.75 md:-left-11.25 md:size-26.5"
          />

          <div className="absolute inset-y-0 inset-x-2 overflow-hidden rounded-2xl bg-primary-light md:inset-x-0 md:rounded-3xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 500px, 346px"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>

          <div className="absolute top-1.5 left-0 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float md:top-4 md:-left-5.5">
            <span className="flex h-8 items-center rounded-lg bg-primary-light px-1 text-body-1 font-bold text-primary">
              {coursesBadge.value}
            </span>
            <span className="text-body-1 text-ink">{coursesBadge.label}</span>
          </div>

          <div className="absolute -right-2.75 bottom-[35.5px] flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-float md:-right-14.25 lg:-right-6 xl:-right-14.25">
            <StarRating value={rating.value} />
            <span className="text-body-1 text-ink">
              {rating.value} {rating.label}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
