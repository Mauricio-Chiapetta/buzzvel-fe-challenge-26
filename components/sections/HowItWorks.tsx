import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepIcon } from "@/components/ui/StepIcon";
import type { HowItWorksContent } from "@/data/howItWorks";

type HowItWorksProps = {
  content: HowItWorksContent;
};

export function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="bg-cream py-15 lg:py-25"
    >
      <Container>
        <SectionHeading
          id="how-it-works-title"
          eyebrow={content.eyebrow}
          title={content.title}
          align="center"
        />

        {/* --gap drives both the column gap and the length of the connecting line */}
        <ol className="relative mt-10 flex flex-col [--gap:2.5rem] lg:flex-row lg:gap-(--gap) lg:py-7 lg:mt-20 lg:[--gap:5rem]">
          {/* Horizontal connector (desktop): from the first icon to under the last one */}
          <span
            aria-hidden="true"
            className="absolute top-14 left-13 hidden h-px bg-line lg:block lg:right-[calc((100%_-_2*var(--gap))/3_-_13px)]"
          />

          {content.steps.map((step, index) => {
            const isLast = index === content.steps.length - 1;
            return (
              <li key={step.title} className="relative flex flex-1 flex-col pb-12 last:pb-0 lg:pb-0">
                {/* Vertical connector (mobile): runs from below the text to the next icon */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-7 h-12 w-px bg-line lg:hidden"
                  />
                )}
                <StepIcon name={step.icon} />
                <p className="pt-6 text-overline font-semibold text-ink-tertiary uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="pt-2 font-display text-h5-mobile font-bold lg:text-h5">{step.title}</h3>
                <p className="pt-3 text-body-1 text-ink-secondary lg:text-subtitle-2">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
