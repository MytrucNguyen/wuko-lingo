import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "ghost" | "chrome";
type Size = "sm" | "md";

type Props = {
  variant?: Variant;
  size?: Size;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

const variantClass: Record<Variant, string> = {
  primary: "icon-btn icon-btn-primary",
  ghost: "icon-btn icon-btn-ghost",
  chrome: "icon-btn icon-btn-chrome",
};

const sizeClass: Record<Size, string> = {
  sm: "icon-btn-sm",
  md: "icon-btn-md",
};

export function IconButton({
  variant = "ghost",
  size = "md",
  onClick,
  disabled = false,
  ariaLabel,
  children,
  className = "",
  type = "button",
}: Props) {
  const classes = `${variantClass[variant]} ${sizeClass[size]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
