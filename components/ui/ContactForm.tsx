"use client";

import { useTranslations } from "next-intl";
import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import type { ContactContent } from "@/data/contact";
import { cn } from "@/lib/cn";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validateContact";

type ContactFormProps = {
  content: ContactContent["form"];
  /** Simulated request — swap for a real API call. Defaults to a short delay. */
  onSubmit?: (values: ContactValues) => Promise<void>;
};

type Status = "idle" | "sending" | "success" | "error";

const EMPTY: ContactValues = { name: "", email: "", message: "" };

const fakeSubmit = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

export function ContactForm({ content, onSubmit = fakeSubmit }: ContactFormProps) {
  const tErrors = useTranslations("contact.errors");
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  function update(name: keyof ContactValues, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (status === "success" || status === "error") setStatus("idle");
    // After the first submit attempt, keep errors in sync while the user fixes them.
    if (submitted) setErrors(validateContact(next));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const firstInvalid = content.fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await onSubmit(values);
      setStatus("success");
      setValues(EMPTY);
      setSubmitted(false);
    } catch {
      // Keep what the user typed so they can retry.
      setStatus("error");
    }
  }

  const statusMessage =
    status === "success" ? content.successMessage : status === "error" ? content.errorMessage : "";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby={`${id}-title`}
      className="flex w-full flex-col gap-6 rounded-2xl border border-line bg-white px-5 py-6 shadow-card lg:w-135 lg:shrink-0 lg:p-10"
    >
      <div className="flex flex-col gap-2">
        <h3 id={`${id}-title`} className="font-display text-h5 font-bold">
          {content.title}
        </h3>
        <p className="text-body-1 text-ink-secondary">{content.description}</p>
      </div>

      <div className="flex flex-col gap-5">
        {content.fields.map((field) => {
          const fieldId = `${id}-${field.name}`;
          const errorId = `${fieldId}-error`;
          const error = errors[field.name];
          const shared = {
            id: fieldId,
            name: field.name,
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            required: true,
            value: values[field.name],
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            className: cn(
              "w-full rounded-lg border bg-cream px-4 text-body-1 text-ink placeholder:text-ink-tertiary transition-colors",
              "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-0",
              error ? "border-danger" : "border-line",
            ),
          };

          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={fieldId} className="text-body-1 font-bold">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...shared}
                  rows={4}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={cn(shared.className, "h-25 resize-y py-3.5 lg:h-30")}
                />
              ) : (
                <input
                  {...shared}
                  type={field.type}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={cn(shared.className, "py-3")}
                />
              )}
              {error && (
                <p id={errorId} className="text-body-1 text-danger">
                  {tErrors(error)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(buttonClasses({ fullWidth: true }), "disabled:cursor-wait disabled:opacity-70")}
      >
        {status === "sending" ? content.sendingLabel : content.submitLabel}
      </button>

      <p
        role="status"
        className={cn(
          "text-body-1",
          status === "error" ? "text-danger" : "text-ink",
          !statusMessage && "sr-only",
        )}
      >
        {statusMessage}
      </p>
    </form>
  );
}
