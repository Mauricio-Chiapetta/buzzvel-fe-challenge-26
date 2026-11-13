import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** `dark` for light backgrounds (header), `light` for the dark footer. */
  tone?: "dark" | "light";
  className?: string;
};

export function Logo({ tone = "dark", className }: LogoProps) {
  const t = useTranslations("common");
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={tone === "dark" ? "/icons/logo.svg" : "/icons/logo-light.svg"}
        alt={t("logoAlt")}
        width={54}
        height={17}
        unoptimized
      />
    </Link>
  );
}
