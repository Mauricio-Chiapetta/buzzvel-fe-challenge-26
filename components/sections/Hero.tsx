import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { MaskBlock, MaskWords } from "@/components/motion/MaskText";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StarRating } from "@/components/ui/StarRating";
import type { HeroContent } from "@/data/hero";

/** CSS-only entrance (no JS, starts on first paint — keeps LCP fast). Staggered via animation-delay. */
const delay = (...ms: number[]) => ({ animationDelay: ms.map((value) => `${value}ms`).join(", ") });

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const { eyebrow, title, description, primaryCta, secondaryCta, trust, image, coursesBadge, rating } =
    content;
  const t = useTranslations("hero");
  // Intl number formatting per locale: 24,000 / 24.000 and 4.9 / 4,9
  const format = useFormatter();

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-cream py-15 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start xl:gap-15">
        {/* Copy */}
        <div className="flex flex-1 flex-col">
          <MaskBlock delay={0}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </MaskBlock>
          {/* Mask reveal word by word; the full title stays available to screen readers. */}
          <h1
            id="hero-title"
            aria-label={title}
            className="pt-4 font-display text-h1-mobile font-extrabold md:text-h3 xl:text-h1"
          >
            <MaskWords text={title} delay={120} stagger={70} />
          </h1>
          <MaskBlock delay={600} className="pt-6">
            <p className="max-w-120 text-subtitle-1-mobile text-ink-secondary lg:text-subtitle-1">
              {description}
            </p>
          </MaskBlock>

          <div style={delay(750)} className="flex flex-col gap-3 pt-8 motion-safe:animate-fade-up sm:flex-row">
            <ButtonLink href={primaryCta.href} className="w-full sm:w-auto">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <div style={delay(850)} className="flex items-center justify-center gap-3 pt-8 motion-safe:animate-fade-up sm:justify-start">
            <AvatarStack people={trust.people} />
            <p className="text-body-1 text-ink-secondary">
              {t.rich("trust", {
                count: format.number(trust.count),
                strong: (chunks) => <strong className="font-bold text-ink">{chunks}</strong>,
              })}
            </p>
          </div>
        </div>

        {/* Visual — below the copy on mobile/tablet (design change by the author), right column on desktop */}
        <div className="relative mx-auto h-95 w-full max-w-90.5 shrink-0 md:h-130 md:max-w-125 lg:mx-0 lg:w-125">
          <div
            aria-hidden="true"
            style={delay(450)}
            className="absolute top-6 -right-2.5 motion-safe:animate-fade-up bottom-3.5 w-[271.5px] rounded-2xl bg-orange-light md:-right-9.75 md:bottom-7 md:w-22.25"
          />
          <div
            aria-hidden="true"
            style={delay(550)}
            className="absolute bottom-3 -left-2.5 motion-safe:animate-fade-up size-16 rounded-full bg-primary-light md:bottom-2.75 md:-left-11.25 md:size-26.5"
          />

          <div style={delay(120)} className="absolute inset-y-0 inset-x-2 motion-safe:animate-image-reveal overflow-hidden rounded-2xl bg-primary-light md:inset-x-0 md:rounded-3xl">
            {/* Scroll parallax inside the frame (Motion) + CSS zoom-settle on load */}
            <ParallaxLayer amount={40} range="top">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 500px, 346px"
                loading="eager"
                fetchPriority="high"
                style={delay(120)}
                className="object-cover motion-safe:animate-photo-settle"
              />
            </ParallaxLayer>
          </div>

          {/* Floating cards: entrance, then an endless gentle float (desynced delays). */}
          <div
            style={delay(750, 1550)}
            className="absolute top-1.5 left-0 motion-safe:animate-card flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-float md:top-4 md:-left-5.5"
          >
            <span className="flex h-8 items-center rounded-lg bg-primary-light px-1 text-body-1 font-bold text-primary">
              {coursesBadge.value}
            </span>
            <span className="text-body-1 text-ink">{coursesBadge.label}</span>
          </div>

          <div
            style={delay(900, 3100)}
            className="absolute -right-2.75 bottom-[35.5px] motion-safe:animate-card flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-float md:-right-14.25 lg:-right-6 xl:-right-14.25"
          >
            <StarRating value={rating.value} decorative />
            <span className="text-body-1 text-ink">
              {t("rating", { value: format.number(rating.value, { minimumFractionDigits: 1 }) })}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
