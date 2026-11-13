"use client";

import { AnimatePresence, m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { LanguagesIcon, type LanguagesIconHandle } from "@/components/icons/animated/languages";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeTags, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Language picker (next-intl): an icon-only button (lucide-animated "languages") that opens a
 * small popup menu with the available languages. Selecting one switches to the same page in that
 * locale ("/" ↔ "/pt") keeping the scroll position.
 * Accessible menu pattern: aria-haspopup/expanded, menuitemradio + aria-checked, arrow keys,
 * Home/End, Esc (focus returns to the button), click outside / Tab to close.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const iconRef = useRef<LanguagesIconHandle>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Move focus into the menu (on the active language) when it opens.
  useEffect(() => {
    if (!open) return;
    const activeIndex = routing.locales.indexOf(locale);
    itemRefs.current[activeIndex]?.focus();
  }, [open, locale]);

  function choose(next: Locale) {
    setOpen(false);
    buttonRef.current?.focus();
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus();

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={t("chooseLanguage")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-busy={isPending || undefined}
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        onFocus={() => iconRef.current?.startAnimation()}
        onBlur={() => iconRef.current?.stopAnimation()}
        className={cn(
          "flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-primary-light hover:text-primary",
          open && "bg-primary-light text-primary",
          isPending && "opacity-70",
        )}
      >
        <LanguagesIcon ref={iconRef} size={20} className="flex" />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            role="menu"
            aria-label={t("chooseLanguage")}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 420, damping: 30, staggerChildren: 0.05 },
            }}
            exit={{ opacity: 0, scale: 0.95, y: -4, transition: { duration: 0.15 } }}
            className="absolute top-full right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-line bg-white p-1.5 shadow-float"
          >
            {routing.locales.map((option, index) => {
              const active = option === locale;
              return (
                <m.button
                  key={option}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={localeTags[option].lang}
                  onClick={() => choose(option)}
                  variants={{ hidden: { opacity: 0, y: -4 }, show: { opacity: 1, y: 0 } }}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: 0.04 + index * 0.05 }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-body-1 transition-colors outline-none",
                    "hover:bg-cream focus-visible:bg-cream",
                    active ? "font-bold text-primary" : "text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-2">
                    {localeTags[option].label}
                    <span className="text-overline font-semibold text-ink-tertiary uppercase">{option}</span>
                  </span>
                  {active && (
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </m.button>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
