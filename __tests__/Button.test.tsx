import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link styled as a primary large button by default", () => {
    render(<ButtonLink href="#contact">Get started</ButtonLink>);
    const link = screen.getByRole("link", { name: "Get started" });
    expect(link).toHaveAttribute("href", "#contact");
    expect(link).toHaveClass("bg-primary", "px-7", "py-3.5");
  });

  it("applies variant, size, full width and extra classes", () => {
    render(
      <ButtonLink href="#" variant="secondary" size="md" fullWidth className="extra">
        Log in
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Log in" });
    expect(link).toHaveClass("border-line", "bg-white", "px-5", "w-full", "extra");
    expect(link).not.toHaveClass("bg-primary");
  });

  it("marks button links as cursor wrap targets", () => {
    render(<ButtonLink href="#">Sign up</ButtonLink>);
    expect(screen.getByRole("link")).toHaveAttribute("data-cursor", "wrap");
  });

  it("exposes the classes for native buttons too", () => {
    expect(buttonClasses({ variant: "accent" })).toContain("bg-yellow");
  });
});
