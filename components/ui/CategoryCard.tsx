import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  index: number;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

/** Numbered category card — the whole card is a single link. */
export function CategoryCard({ index, title, description, href, linkLabel }: CategoryCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={href}
      className="group flex min-h-50 w-full flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-colors hover:border-primary lg:min-h-65 lg:p-7"
    >
      <div>
        <div className="h-[46.5px] pt-0.5">
          <span
            aria-hidden="true"
            className="inline-flex rounded-md bg-primary-light px-2 py-1 text-overline font-semibold text-primary"
          >
            {number}
          </span>
        </div>
        <h3 className="font-display text-h5-mobile font-bold lg:text-h5">{title}</h3>
        <p className="pt-3 text-body-1 text-ink-tertiary">{description}</p>
      </div>

      <span className="flex items-center gap-2 pt-6 text-body-1 font-bold">
        {linkLabel}
        <Image
          src="/icons/arrow-right.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
          className="transition-transform motion-safe:group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
