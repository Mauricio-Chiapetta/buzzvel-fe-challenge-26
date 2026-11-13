export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Pure validation so it can be unit-tested independently of the form UI. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Your name should have at least 2 characters.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please tell us how we can help.";
  else if (message.length < 10) errors.message = "Your question should have at least 10 characters.";

  return errors;
}
