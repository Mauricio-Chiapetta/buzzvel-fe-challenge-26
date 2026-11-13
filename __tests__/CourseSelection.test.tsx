import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Categories } from "@/components/sections/Categories";
import { CourseSelectionProvider } from "@/components/sections/CourseSelection";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { categories } from "@/data/categories";
import { featuredCourse } from "@/data/featuredCourse";
import { renderWithProviders } from "./utils";

function setup(locale: "en" | "pt" = "en") {
  const user = userEvent.setup();
  renderWithProviders(
    <CourseSelectionProvider defaultCategory={featuredCourse[locale].defaultCategory}>
      <Categories content={categories[locale]} />
      <FeaturedCourse content={featuredCourse[locale]} />
    </CourseSelectionProvider>,
    { locale },
  );
  return { user };
}

const courseHeading = () => document.getElementById("featured-course-title");
const card = (title: string) => screen.getByRole("link", { name: new RegExp(title) });

describe("Categories → Featured Course", () => {
  it("shows the design's course (Product Design) by default", () => {
    setup();
    expect(courseHeading()).toHaveAccessibleName(featuredCourse.en.courses["product-design"].title);
    expect(card("Product Design")).toHaveAttribute("aria-current", "true");
  });

  it("switches the featured course when a category card is clicked", async () => {
    const { user } = setup();
    const technology = featuredCourse.en.courses.technology;
    const technologyCard = card("Technology");

    await user.click(technologyCard);

    expect(courseHeading()).toHaveAccessibleName(technology.title);
    expect(technologyCard).toHaveAttribute("aria-current", "true");
    expect(card("Product Design")).not.toHaveAttribute("aria-current", "true");
    expect(technologyCard).toHaveAttribute("href", "#featured-course");
    expect(screen.getByRole("img", { name: technology.image.alt })).toBeInTheDocument();
    expect(screen.getByText(`Featured course: ${technology.title}`)).toBeInTheDocument();
  });

  it("works in Portuguese", async () => {
    const { user } = setup("pt");
    await user.click(card(categories.pt.items[2].title));
    expect(courseHeading()).toHaveAccessibleName(featuredCourse.pt.courses.business.title);
  });
});
