"use client";

import { m, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, revealViewport } from "@/components/motion/Reveal";
import { StepIcon } from "@/components/ui/StepIcon";
import type { Step } from "@/data/howItWorks";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Seconds between steps on desktop — the connector line takes the same time to reach the next icon. */
const STEP_INTERVAL = 0.6;
const START = 0.15;

type HowItWorksStepsProps = {
  steps: Step[];
};

/**
 * Step 1 → Step 2 → Step 3 timeline.
 * Desktop: the connector line draws left → right and each icon springs in as the line reaches it,
 * followed by its texts through masks. Mobile (stacked): each step animates as it enters the screen.
 */
export function HowItWorksSteps({ steps }: HowItWorksStepsProps) {
  const t = useTranslations("howItWorks");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    // --gap drives both the column gap and the length of the connecting line
    <ol
      className="relative mt-10 flex flex-col [--gap:2.5rem] lg:mt-20 lg:flex-row lg:gap-(--gap) lg:py-7 lg:[--gap:5rem]"
    >
      {/* Horizontal connector (desktop): draws from the first icon to under the last one */}
      <m.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={revealViewport}
        transition={{ duration: STEP_INTERVAL * (steps.length - 1), delay: START, ease: "linear" }}
        className="absolute top-14 left-13 hidden h-px origin-left bg-line lg:block lg:right-[calc((100%_-_2*var(--gap))/3_-_13px)]"
      />

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        // Desktop: sequential (synced with the line). Mobile: each step starts when it scrolls in.
        const base = isDesktop ? START + index * STEP_INTERVAL : 0;

        return (
          <m.li
            key={step.title}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="relative flex flex-1 flex-col pb-12 last:pb-0 lg:pb-0"
          >
            {/* Vertical connector (mobile): grows down towards the next step */}
            {!isLast && (
              <m.span
                aria-hidden="true"
                variants={{
                  hidden: { scaleY: 0 },
                  show: { scaleY: 1, transition: { duration: 0.6, delay: base + 0.8, ease: EASE_OUT_EXPO } },
                }}
                className="absolute bottom-0 left-7 h-12 w-px origin-top bg-line lg:hidden"
              />
            )}

            <StepIcon name={step.icon} delay={base} />

            <MaskLine delay={base + 0.35} className="pt-6">
              <p className="text-overline font-semibold text-ink-secondary uppercase">
                {t("step", { number: String(index + 1).padStart(2, "0") })}
              </p>
            </MaskLine>
            <MaskLine delay={base + 0.45} className="pt-2">
              <h3 className="font-display text-h5-mobile font-bold lg:text-h5">{step.title}</h3>
            </MaskLine>
            <MaskLine delay={base + 0.55} className="pt-3">
              <p className="text-body-1 text-ink-secondary lg:text-subtitle-2">{step.description}</p>
            </MaskLine>
          </m.li>
        );
      })}
    </ol>
  );
}

/** Mask reveal driven by the parent step's variants (no own in-view trigger). */
function MaskLine({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  const slide: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO } },
  };
  return (
    <div className={className}>
      <div className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <m.div variants={slide}>{children}</m.div>
      </div>
    </div>
  );
}
