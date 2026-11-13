import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";
import { CourseSelectionProvider } from "@/components/sections/CourseSelection";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { People } from "@/components/sections/People";
import { Testimonial } from "@/components/sections/Testimonial";
import { categories } from "@/data/categories";
import { contact } from "@/data/contact";
import { featuredCourse } from "@/data/featuredCourse";
import { finalCta } from "@/data/finalCta";
import { footer } from "@/data/footer";
import { hero } from "@/data/hero";
import { howItWorks } from "@/data/howItWorks";
import { navigation } from "@/data/navigation";
import { people } from "@/data/people";
import { testimonial } from "@/data/testimonial";
import type { Locale } from "@/i18n/routing";
import { renderWithProviders } from "./utils";

/** The whole landing page, as composed in app/[locale]/page.tsx. */
function Page({ locale }: { locale: Locale }) {
  return (
    <>
      <Header navigation={navigation[locale]} />
      <main id="main">
        <Hero content={hero[locale]} />
        <CourseSelectionProvider defaultCategory={featuredCourse[locale].defaultCategory}>
          <Categories content={categories[locale]} />
          <FeaturedCourse content={featuredCourse[locale]} />
        </CourseSelectionProvider>
        <HowItWorks content={howItWorks[locale]} />
        <Testimonial content={testimonial[locale]} />
        <People content={people[locale]} />
        <Contact content={contact[locale]} />
        <FinalCta content={finalCta[locale]} />
      </main>
      <Footer content={footer[locale]} />
    </>
  );
}

describe("Accessibility (axe-core)", () => {
  it.each<Locale>(["en", "pt"])("has no WCAG A/AA violations on the page (%s)", async (locale) => {
    const { container } = renderWithProviders(<Page locale={locale} />, { locale });

    const results = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
      rules: {
        // jsdom has no layout or rendering: contrast is checked with Lighthouse instead.
        "color-contrast": { enabled: false },
        // The test renders a fragment of the document, not the full <html> with <title>/lang.
        region: { enabled: false },
      },
    });

    const violations = results.violations.map(
      (violation) =>
        `${violation.id}: ${violation.help}\n` +
        violation.nodes.map((node) => `  - ${node.target.join(" ")}`).join("\n"),
    );
    expect(violations).toEqual([]);
  });
});
