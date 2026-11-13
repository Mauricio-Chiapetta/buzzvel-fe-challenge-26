import type { ReactNode } from "react";
import { ScrollMaskBlock, ScrollMaskWords } from "@/components/motion/ScrollMask";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  /** Used as the heading id so the section can reference it with aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** Mobile size of the lead paragraph: `md` = 16/26 (default), `sm` = 14/24. Desktop is always 18/28. */
  descriptionSize?: "md" | "sm";
  /** Awwwards-style mask reveal on scroll (eyebrow → title word by word → description). */
  animated?: boolean;
  className?: string;
};

/** Eyebrow + H2 + optional lead paragraph, shared by most sections. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  descriptionSize = "md",
  animated = false,
  className,
}: SectionHeadingProps) {
  const descriptionClassName = cn(
    "text-ink-secondary md:text-subtitle-1",
    descriptionSize === "md" ? "text-subtitle-1-mobile" : "text-body-1",
  );

  if (animated) {
    return (
      <div
        className={cn(
          "flex flex-col",
          align === "center" ? "mx-auto items-center text-center" : "max-w-140",
          className,
        )}
      >
        <ScrollMaskBlock>
          <Eyebrow>{eyebrow}</Eyebrow>
        </ScrollMaskBlock>
        <h2
          id={id}
          aria-label={title}
          className="pt-4 font-display text-h3-mobile font-extrabold md:text-h3"
        >
          <ScrollMaskWords text={title} delay={0.1} />
        </h2>
        {description && (
          <ScrollMaskBlock delay={0.45} className="pt-4">
            <p className={descriptionClassName}>{description}</p>
          </ScrollMaskBlock>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "mx-auto items-center text-center" : "max-w-140",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="pt-4 font-display text-h3-mobile font-extrabold md:text-h3">
        {title}
      </h2>
      {description && (
        <p className={cn("pt-4", descriptionClassName)}>{description}</p>
      )}
    </div>
  );
}
