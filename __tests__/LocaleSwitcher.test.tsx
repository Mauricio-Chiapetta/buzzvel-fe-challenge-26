import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import { renderWithProviders } from "./utils";

const replace = vi.fn();
vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ replace }),
}));

function setup(locale: "en" | "pt" = "en") {
  const user = userEvent.setup();
  renderWithProviders(<LocaleSwitcher />, { locale });
  const label = (locale === "en" ? en : pt).common.chooseLanguage;
  return { user, button: screen.getByRole("button", { name: label }) };
}

describe("LocaleSwitcher", () => {
  beforeEach(() => replace.mockClear());

  it("opens a menu with the languages and focuses the active one", async () => {
    const { user, button } = setup();
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    const items = screen.getAllByRole("menuitemradio");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("English");
    expect(items[1]).toHaveTextContent("Português");
    expect(items[0]).toHaveAttribute("aria-checked", "true");
    expect(items[1]).toHaveAttribute("aria-checked", "false");
    expect(items[0]).toHaveFocus();
    expect(items[1]).toHaveAttribute("lang", "pt-BR");
  });

  it("supports arrow keys, Home/End and Escape", async () => {
    const { user, button } = setup();
    await user.click(button);
    const [english, portuguese] = screen.getAllByRole("menuitemradio");

    await user.keyboard("{ArrowDown}");
    expect(portuguese).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(english).toHaveFocus();
    await user.keyboard("{End}");
    expect(portuguese).toHaveFocus();
    await user.keyboard("{Home}");
    expect(english).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("switches to the same page in the chosen language without scrolling", async () => {
    const { user, button } = setup();
    await user.click(button);
    await user.click(screen.getByRole("menuitemradio", { name: /Português/ }));
    expect(replace).toHaveBeenCalledWith("/", { locale: "pt", scroll: false });
    expect(button).toHaveFocus();
  });

  it("does nothing when the current language is chosen", async () => {
    const { user, button } = setup("pt");
    await user.click(button);
    await user.click(screen.getByRole("menuitemradio", { name: /Português/ }));
    expect(replace).not.toHaveBeenCalled();
  });
});
