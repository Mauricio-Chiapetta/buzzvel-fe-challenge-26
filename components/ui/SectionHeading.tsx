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
  className?: string;
};

/** Eyebrow + H2 + optional lead paragraph, shared by most sections. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-140 flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="pt-4 font-display text-h3-mobile font-extrabold md:text-h3">
        {title}
      </h2>
      {description && (
        <p className="pt-4 text-subtitle-1-mobile text-ink-secondary md:text-subtitle-1">
          {description}
        </p>
      )}
    </div>
  );
}
