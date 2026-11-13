import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: ImageAsset[];
  /** `sm` = 32px (hero), `md` = 40px (final CTA). Both overlap by 8px. */
  size?: "sm" | "md";
  /** Border color — should match the background the stack sits on. */
  ringClassName?: string;
  className?: string;
};

const sizes = { sm: { px: 32, className: "size-8" }, md: { px: 40, className: "size-10" } };

/** Overlapping circular avatars. Decorative by default (empty alt). */
export function AvatarStack({
  avatars,
  size = "sm",
  ringClassName = "border-cream",
  className,
}: AvatarStackProps) {
  const { px, className: sizeClassName } = sizes[size];

  return (
    <div className={cn("flex", className)}>
      {avatars.map((avatar, index) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={px}
          height={px}
          className={cn(
            "rounded-full border-2 bg-primary-light object-cover",
            sizeClassName,
            ringClassName,
            index > 0 && "-ml-2",
          )}
        />
      ))}
    </div>
  );
}
