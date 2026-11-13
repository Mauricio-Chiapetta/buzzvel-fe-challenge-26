import Image from "next/image";

type StarRatingProps = {
  value: number;
  max?: number;
  /** Hide from assistive tech when the rating is already written out next to the stars. */
  decorative?: boolean;
};

/** Row of stars announced as a single "Rated X out of Y" label (or hidden when decorative). */
export function StarRating({ value, max = 5, decorative = false }: StarRatingProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": `Rated ${value} out of ${max}` } as const);

  return (
    <span {...a11y} className="flex gap-0.5">
      {Array.from({ length: max }, (_, index) => (
        <Image key={index} src="/icons/star.svg" alt="" width={14} height={14} unoptimized />
      ))}
    </span>
  );
}
