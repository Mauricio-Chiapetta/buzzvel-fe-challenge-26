import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: ImageAsset[];
  /** Border color — should match the background the stack sits on. */
  ringClassName?: string;
  className?: string;
};

/** Overlapping circular avatars (32px, 8px overlap). Decorative by default (empty alt). */
export function AvatarStack({ avatars, ringClassName = "border-cream", className }: AvatarStackProps) {
  return (
    <div className={cn("flex", className)}>
      {avatars.map((avatar, index) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={32}
          height={32}
          className={cn(
            "size-8 rounded-full border-2 bg-primary-light object-cover",
            ringClassName,
            index > 0 && "-ml-2",
          )}
        />
      ))}
    </div>
  );
}
