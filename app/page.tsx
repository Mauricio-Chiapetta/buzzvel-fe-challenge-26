import { Header } from "@/components/layout/Header";
import { Categories } from "@/components/sections/Categories";
import { Hero } from "@/components/sections/Hero";
import { categories } from "@/data/categories";
import { hero } from "@/data/hero";

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
      </main>
    </>
  );
}
