import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "accent";
export type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border border-line bg-white text-ink hover:border-ink-tertiary",
  accent: "bg-yellow text-ink hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5",
};

export function buttonClasses({
  variant = "primary",
  size = "lg",
  fullWidth = false,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-lg text-body-1 font-bold whitespace-nowrap",
    "transition-[color,background-color,border-color,filter,scale] duration-200 motion-safe:active:scale-[0.97]",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

/** A link styled as a button — every CTA in the design navigates somewhere. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-cursor="wrap"
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}
