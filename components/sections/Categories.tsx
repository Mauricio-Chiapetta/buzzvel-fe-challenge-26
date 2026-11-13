import { Reveal } from "@/components/motion/Reveal";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CategoriesContent } from "@/data/categories";

type CategoriesProps = {
  content: CategoriesContent;
};

export function Categories({ content }: CategoriesProps) {
  return (
    <section id="courses" aria-labelledby="categories-title" className="bg-white py-15 lg:py-25">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          animated
        />

        {/* Each card has its own in-view trigger (one at a time on mobile as you scroll);
            the per-index delay staggers them when a whole row enters together on desktop. */}
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {content.items.map((item, index) => (
            <Reveal
              as="li"
              variant="soft"
              duration={1.1}
              delay={index * 0.18}
              key={item.title}
              className="flex"
            >
              <CategoryCard
                index={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={item.href}
                linkLabel={content.linkLabel}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
