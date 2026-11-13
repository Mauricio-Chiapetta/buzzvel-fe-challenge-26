import Image from "next/image";

type StarRatingProps = {
  value: number;
  max?: number;
};

/** Row of stars announced as a single "Rated X out of Y" label. */
export function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <span role="img" aria-label={`Rated ${value} out of ${max}`} className="flex gap-0.5">
      {Array.from({ length: max }, (_, index) => (
        <Image key={index} src="/icons/star.svg" alt="" width={14} height={14} unoptimized />
      ))}
    </span>
  );
}
