import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/validateContact";

const valid = { name: "Maya Chen", email: "maya@example.com", message: "I would like to know more." };

describe("validateContact", () => {
  it("accepts valid values", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires every field (whitespace counts as empty)", () => {
    expect(validateContact({ name: " ", email: "", message: "\n" })).toEqual({
      name: "nameRequired",
      email: "emailRequired",
      message: "messageRequired",
    });
  });

  it("enforces minimum lengths after trimming", () => {
    expect(validateContact({ ...valid, name: " M " }).name).toBe("nameShort");
    expect(validateContact({ ...valid, message: "  too short " }).message).toBe("messageShort");
  });

  it.each(["maya", "maya@", "maya@example", "maya @example.com", "@example.com"])(
    "rejects the invalid email %s",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe("emailInvalid");
    },
  );
});
