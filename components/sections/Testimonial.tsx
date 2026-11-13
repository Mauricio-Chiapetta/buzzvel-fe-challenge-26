import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { TestimonialContent } from "@/data/testimonial";

type TestimonialProps = {
  content: TestimonialContent;
};

export function Testimonial({ content }: TestimonialProps) {
  const { quote, author, stats } = content;

  return (
    <section aria-label="What learners say" className="bg-white py-15 lg:py-25">
      <Container className="flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <figure className="flex max-w-150 flex-col">
          <Image src="/icons/quote.svg" alt="" width={24} height={22} unoptimized />
          <blockquote className="pt-4 font-display text-quote-mobile font-semibold lg:text-quote">
            <p>{quote}</p>
          </blockquote>
          <figcaption className="flex items-center gap-4 pt-8">
            <Image
              src={author.avatar.src}
              alt={author.avatar.alt}
              width={48}
              height={48}
              className="size-12 rounded-full bg-primary-light object-cover"
            />
            <span className="flex flex-col">
              <span className="text-subtitle-2 font-bold">{author.name}</span>
              <span className="text-body-1 text-ink-secondary">{author.role}</span>
            </span>
          </figcaption>
        </figure>

        <ul className="flex gap-2 lg:w-100 lg:shrink-0 lg:flex-col lg:gap-5 lg:border-l lg:border-line lg:pl-12">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-1 flex-col">
              <span className="font-display text-h1-mobile font-extrabold text-primary lg:text-h1">
                {stat.value}
              </span>
              <span className="pt-1 text-body-1 text-ink-tertiary">{stat.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
