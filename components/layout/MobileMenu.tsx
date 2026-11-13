"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, m, type Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MenuIcon, type MenuIconHandle } from "@/components/icons/animated/menu";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import type { NavLink } from "@/data/navigation";

type MobileMenuProps = {
  links: NavLink[];
  login: NavLink;
  signup: NavLink;
};

const subscribe = () => () => {};
/** Portals need `document`, which only exists after hydration. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const panelVariants: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO, when: "afterChildren" },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

/** Each link slides up through its own mask. */
const linkVariants: Variants = {
  closed: { y: "110%", transition: { duration: 0.2 } },
  open: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Dividers draw from the left. */
const dividerVariants: Variants = {
  closed: { scaleX: 0, transition: { duration: 0.2 } },
  open: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

const ctaVariants: Variants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.15 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/**
 * Hamburger menu for viewports below `lg`.
 * The open state is not in the Figma file — it reuses the header's colors and button styles.
 *
 * Motion: lucide-animated menu icon morphs ☰ → ✕; the panel opens as a top-down curtain
 * (clip-path), links rise through masks with drawing dividers, CTAs follow; the page behind
 * dims and blurs (tap to close) and scrolling is locked (Lenis stopped) while open.
 * Esc closes and returns focus to the toggle.
 */
export function MobileMenu({ links, login, signup }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<MenuIconHandle>(null);
  const lenis = useLenis();
  const mounted = useMounted();

  // Icon morph follows the open state.
  useEffect(() => {
    if (open) iconRef.current?.startAnimation();
    else iconRef.current?.stopAnimation();
  }, [open]);

  // Scroll lock while open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

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
        className="-mr-1.5 flex p-1.5 text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon ref={iconRef} size={24} className="flex" />
      </button>

      {/* Dimmed, blurred page behind the menu — portalled to <body> because the header's
          backdrop-filter would otherwise trap a fixed element inside it. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <m.div
                key="menu-backdrop"
                aria-hidden="true"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] lg:hidden"
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            key="panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute inset-x-0 top-full border-b border-line bg-cream shadow-float"
          >
            <nav aria-label="Mobile" className="px-5 pt-2 pb-6">
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href} className="relative">
                    <div className="overflow-hidden">
                      <m.div variants={linkVariants}>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="block py-4 text-subtitle-2 text-ink transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </m.div>
                    </div>
                    <m.span
                      aria-hidden="true"
                      variants={dividerVariants}
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
                    />
                  </li>
                ))}
              </ul>
              <m.div variants={ctaVariants} className="mt-6 flex flex-col gap-3">
                <ButtonLink href={signup.href} onClick={close} fullWidth>
                  {signup.label}
                </ButtonLink>
                <ButtonLink href={login.href} onClick={close} variant="secondary" fullWidth>
                  {login.label}
                </ButtonLink>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
