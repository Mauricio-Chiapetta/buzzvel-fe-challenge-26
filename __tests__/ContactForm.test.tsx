import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/ui/ContactForm";
import { contact } from "@/data/contact";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import { renderWithProviders } from "./utils";

const form = contact.en.form;
const [nameField, emailField, messageField] = form.fields;

function setup(onSubmit = vi.fn().mockResolvedValue(undefined), locale: "en" | "pt" = "en") {
  const user = userEvent.setup();
  renderWithProviders(<ContactForm content={contact[locale].form} onSubmit={onSubmit} />, { locale });
  return { user, onSubmit };
}

const field = (label: string) => screen.getByLabelText(label);

describe("ContactForm", () => {
  it("shows linked errors and focuses the first invalid field on an empty submit", async () => {
    const { user, onSubmit } = setup();
    await user.click(screen.getByRole("button", { name: form.submitLabel }));

    const name = field(nameField.label);
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(en.contact.errors.nameRequired);
    expect(field(emailField.label)).toHaveAccessibleDescription(en.contact.errors.emailRequired);
    expect(field(messageField.label)).toHaveAccessibleDescription(en.contact.errors.messageRequired);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("revalidates while the user fixes the fields after the first attempt", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: form.submitLabel }));

    const email = field(emailField.label);
    await user.type(email, "maya");
    expect(email).toHaveAccessibleDescription(en.contact.errors.emailInvalid);
    await user.type(email, "@example.com");
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("submits valid values, announces success and resets the form", async () => {
    const { user, onSubmit } = setup();
    await user.type(field(nameField.label), "Maya Chen");
    await user.type(field(emailField.label), "maya@example.com");
    await user.type(field(messageField.label), "How do the courses work?");
    await user.click(screen.getByRole("button", { name: form.submitLabel }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Maya Chen",
      email: "maya@example.com",
      message: "How do the courses work?",
    });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(form.successMessage));
    expect(field(nameField.label)).toHaveValue("");
  });

  it("keeps the values and shows an error when sending fails", async () => {
    const { user } = setup(vi.fn().mockRejectedValue(new Error("offline")));
    await user.type(field(nameField.label), "Maya Chen");
    await user.type(field(emailField.label), "maya@example.com");
    await user.type(field(messageField.label), "How do the courses work?");
    await user.click(screen.getByRole("button", { name: form.submitLabel }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(form.errorMessage));
    expect(field(nameField.label)).toHaveValue("Maya Chen");
  });

  it("translates the errors in Portuguese", async () => {
    const { user } = setup(undefined, "pt");
    const ptForm = contact.pt.form;
    await user.click(screen.getByRole("button", { name: ptForm.submitLabel }));
    expect(field(ptForm.fields[0].label)).toHaveAccessibleDescription(pt.contact.errors.nameRequired);
  });
});
