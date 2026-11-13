import { describe, expect, it } from "vitest";
import { categories } from "@/data/categories";
import { contact } from "@/data/contact";
import { featuredCourse } from "@/data/featuredCourse";
import { routing } from "@/i18n/routing";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

/** Flattens a messages object into dotted keys ("common.openMenu"). */
function keys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null ? keys(child, `${prefix}${key}.`) : [`${prefix}${key}`],
  );
}

describe("i18n", () => {
  it("serves English at / and Portuguese at /pt, without browser-language redirects", () => {
    expect(routing.locales).toEqual(["en", "pt"]);
    expect(routing.defaultLocale).toBe("en");
    expect(routing.localePrefix).toBe("as-needed");
    expect(routing.localeDetection).toBe(false);
  });

  it("has the same message keys in every language", () => {
    expect(keys(pt).sort()).toEqual(keys(en).sort());
  });

  it("keeps per-locale content in sync (same categories, courses and form fields)", () => {
    expect(categories.pt.items.map((item) => item.id)).toEqual(categories.en.items.map((item) => item.id));
    expect(Object.keys(featuredCourse.pt.courses)).toEqual(Object.keys(featuredCourse.en.courses));
    expect(contact.pt.form.fields.map((field) => field.name)).toEqual(
      contact.en.form.fields.map((field) => field.name),
    );
  });

  it("has a featured course for every category card", () => {
    for (const locale of routing.locales) {
      for (const item of categories[locale].items) {
        expect(featuredCourse[locale].courses[item.id]?.categoryId).toBe(item.id);
      }
    }
  });
});
