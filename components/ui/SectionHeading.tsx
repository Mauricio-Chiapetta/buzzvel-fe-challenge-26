import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  /** Used as the heading id so the section can reference it with aria-labelledby. */
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Mobile size of the lead paragraph: `md` = 16/26 (default), `sm` = 14/24. Desktop is always 18/28. */
  descriptionSize?: "md" | "sm";
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
  className,
}: SectionHeadingProps) {
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
        <p
          className={cn(
            "pt-4 text-ink-secondary md:text-subtitle-1",
            descriptionSize === "md" ? "text-subtitle-1-mobile" : "text-body-1",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
