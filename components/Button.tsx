import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "ghost" | "cta" | "destructive" | "bare";

type Props = {
  variant?: Variant;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
  dataState?: string;
};

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  cta: "cta-btn",
  destructive: "btn btn-destructive",
  bare: "",
};

export function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
  dataState,
}: Props) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("#");
    if (isExternal) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-state={dataState}
      className={classes}
    >
      {children}
    </button>
  );
}
