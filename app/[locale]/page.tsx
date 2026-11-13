import { ConsoleGreeting } from "@/components/layout/ConsoleGreeting";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ProgressiveBlur } from "@/components/motion/ProgressiveBlur";
import { Categories } from "@/components/sections/Categories";
import { CourseSelectionProvider } from "@/components/sections/CourseSelection";
import { Contact } from "@/components/sections/Contact";
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
import { people } from "@/data/people";
import { navigation } from "@/data/navigation";
import { testimonial } from "@/data/testimonial";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "common" });
  // Section copy is authored per locale in typed modules (data/*); pick this locale's version.
  const course = featuredCourse[locale];

  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 rounded-lg bg-primary px-4 py-2 text-body-1 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t("skipToContent")}
      </a>
      <Header navigation={navigation[locale]} />
      <main id="main">
        <Hero content={hero[locale]} />
        {/* Picking a category card switches the featured course below */}
        <CourseSelectionProvider defaultCategory={course.defaultCategory}>
          <Categories content={categories[locale]} />
          <FeaturedCourse content={course} />
        </CourseSelectionProvider>
        <HowItWorks content={howItWorks[locale]} />
        <Testimonial content={testimonial[locale]} />
        <People content={people[locale]} />
        <Contact content={contact[locale]} />
        <FinalCta content={finalCta[locale]} />
      </main>
      <Footer content={footer[locale]} />
      <ProgressiveBlur />
      <CustomCursor />
      <ConsoleGreeting />
    </>
  );
}
