export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

/** Error codes (not copy) — the UI translates them via next-intl (`contact.errors.*`). */
export type ContactErrorCode =
  | "nameRequired"
  | "nameShort"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageShort";

export type ContactErrors = Partial<Record<keyof ContactValues, ContactErrorCode>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Pure validation so it can be unit-tested independently of the form UI and language. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "nameRequired";
  else if (name.length < 2) errors.name = "nameShort";

  if (!email) errors.email = "emailRequired";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length < 10) errors.message = "messageShort";

  return errors;
}
