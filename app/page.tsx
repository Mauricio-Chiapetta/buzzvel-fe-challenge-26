import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Categories } from "@/components/sections/Categories";
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
import { testimonial } from "@/data/testimonial";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 rounded-lg bg-primary px-4 py-2 text-body-1 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero content={hero} />
        <Categories content={categories} />
        <FeaturedCourse content={featuredCourse} />
        <HowItWorks content={howItWorks} />
        <Testimonial content={testimonial} />
        <People content={people} />
        <Contact content={contact} />
        <FinalCta content={finalCta} />
      </main>
      <Footer content={footer} />
    </>
  );
}
