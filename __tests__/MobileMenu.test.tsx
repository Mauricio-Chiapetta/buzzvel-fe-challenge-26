import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navigation } from "@/data/navigation";
import { renderWithProviders } from "./utils";

const { main, login, signup } = navigation.en;

function setup() {
  const user = userEvent.setup();
  renderWithProviders(<MobileMenu links={main} login={login} signup={signup} />);
  return { user };
}

describe("MobileMenu", () => {
  it("is closed by default", () => {
    setup();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  });

  it("opens with the toggle and exposes the links", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const toggle = screen.getByRole("button", { name: "Close menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const nav = screen.getByRole("navigation", { name: "Mobile" });
    expect(toggle.getAttribute("aria-controls")).toBe(nav.parentElement?.id);
    for (const link of main) expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: signup.label })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: login.label })).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument());
  });

  it("closes after choosing a link", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: main[0].label }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });
});
