import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HowItWorksContent } from "@/data/howItWorks";
import { HowItWorksSteps } from "./HowItWorksSteps";

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
          animated
        />

        <HowItWorksSteps steps={content.steps} />
      </Container>
    </section>
  );
}
