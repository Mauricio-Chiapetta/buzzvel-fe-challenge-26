"use client";

import { m } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { NavLink } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";

type DesktopNavProps = {
  links: NavLink[];
};

/** Main navigation with a scrollspy underline that slides between items (Motion layout animation). */
export function DesktopNav({ links }: DesktopNavProps) {
  const t = useTranslations("common");
  const active = useActiveSection(links.map((link) => link.href.replace("#", "")));

  return (
    <nav aria-label={t("mainNav")} className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {links.map((link) => {
          const isActive = active === link.href.replace("#", "");
          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                data-cursor="wrap"
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "text-body-1 transition-colors hover:text-ink",
                  isActive ? "text-ink" : "text-ink-secondary",
                )}
              >
                {link.label}
              </Link>
              {isActive && (
                <m.span
                  layoutId="nav-indicator"
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
