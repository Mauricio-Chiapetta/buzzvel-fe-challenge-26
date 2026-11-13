"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { NavLink } from "@/data/navigation";

type MobileMenuProps = {
  links: NavLink[];
  login: NavLink;
  signup: NavLink;
};

/**
 * Hamburger menu for viewports below `lg`.
 * The open state is not in the Figma file — it reuses the header's colors and button styles.
 */
export function MobileMenu({ links, login, signup }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    // Close if the viewport grows past the breakpoint where the menu is hidden.
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="-mr-1.5 flex p-1.5"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={open ? "close" : "menu"}
            className="flex"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={open ? "/icons/close.svg" : "/icons/menu.svg"}
              alt=""
              width={24}
              height={24}
              unoptimized
            />
          </m.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            key="panel"
            className="absolute inset-x-0 top-full origin-top border-b border-line bg-cream shadow-float"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <nav aria-label="Mobile" className="px-5 pt-2 pb-6">
              <m.ul
                className="flex flex-col"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              >
                {links.map((link) => (
                  <m.li
                    key={link.href}
                    className="border-b border-line"
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block py-4 text-subtitle-2 text-ink transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={signup.href} onClick={close} fullWidth>
                  {signup.label}
                </ButtonLink>
                <ButtonLink href={login.href} onClick={close} variant="secondary" fullWidth>
                  {login.label}
                </ButtonLink>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
