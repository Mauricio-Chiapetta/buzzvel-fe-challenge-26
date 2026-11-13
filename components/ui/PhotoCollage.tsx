import Image from "next/image";
import type { CSSProperties } from "react";
import type { CollageColumn } from "@/data/people";
import { cn } from "@/lib/cn";

type PhotoCollageProps = {
  columns: CollageColumn[];
  className?: string;
};

type SizeVars = CSSProperties & Record<`--${string}`, string>;

/**
 * Staggered photo columns over a soft circle. Sizes come from the Figma frames and are
 * passed as CSS variables so one markup serves both the mobile and desktop proportions.
 */
export function PhotoCollage({ columns, className }: PhotoCollageProps) {
  return (
    <div
      className={cn(
        // 12px gap reproduces the mobile frame's space-between spacing at 402px;
        // narrower phones scale the whole collage down instead of overflowing.
        "relative flex items-center justify-center gap-3 md:gap-4",
        "max-[359px]:scale-[0.77] min-[360px]:max-[402px]:scale-[0.88]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-82.5 -translate-1/2 rounded-full bg-primary-light md:size-125"
      />

      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          style={
            {
              "--pt-m": `${column.offset.mobile}px`,
              "--pt-d": `${column.offset.desktop}px`,
            } as SizeVars
          }
          className={cn(
            "relative flex flex-col gap-2 pt-(--pt-m) md:gap-[12.84px] md:pt-(--pt-d)",
            column.align === "end" ? "items-end" : "items-start",
          )}
        >
          {column.photos.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.desktop[0] * 2}
              height={photo.desktop[1] * 2}
              sizes="(min-width: 768px) 140px, 96px"
              style={
                {
                  "--w-m": `${photo.mobile[0]}px`,
                  "--h-m": `${photo.mobile[1]}px`,
                  "--w-d": `${photo.desktop[0]}px`,
                  "--h-d": `${photo.desktop[1]}px`,
                } as SizeVars
              }
              className="h-(--h-m) w-(--w-m) rounded-[5px] object-cover shadow-photo md:h-(--h-d) md:w-(--w-d) md:rounded-sm"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
