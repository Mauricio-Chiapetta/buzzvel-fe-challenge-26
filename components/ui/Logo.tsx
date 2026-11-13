import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image src="/icons/logo.svg" alt="Luma — home" width={54} height={17} unoptimized />
    </Link>
  );
}
