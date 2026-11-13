import type { StepIcon as StepIconName } from "@/data/howItWorks";

/** Abstract 56px step illustrations, drawn with CSS shapes like in the Figma file. */
export function StepIcon({ name }: { name: StepIconName }) {
  if (name === "focus") {
    return (
      <span aria-hidden="true" className="relative block size-14 rounded-full bg-primary-light">
        <span className="absolute top-2 left-2 size-6 rounded-md bg-primary" />
      </span>
    );
  }

  if (name === "experience") {
    return (
      <span aria-hidden="true" className="relative block size-14">
        <span className="absolute inset-0 rotate-12 rounded-lg bg-orange/15 lg:bg-orange-light" />
        <span className="absolute top-6 left-6 size-7 rounded-full bg-orange" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative block size-14 rounded-xl bg-yellow-light">
      <span className="absolute top-7 left-2 size-5 rounded-full bg-mustard" />
    </span>
  );
}
