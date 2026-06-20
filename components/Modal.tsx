"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Size = "sm" | "md" | "lg";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  ariaLabelledBy?: string;
  size?: Size;
  children: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
};

const sizeClass: Record<Size, string> = {
  sm: "modal-size-sm",
  md: "modal-size-md",
  lg: "modal-size-lg",
};

export function Modal({
  open,
  onClose,
  title,
  ariaLabelledBy,
  size = "md",
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Escape key handling
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEscape, onClose]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the first focusable inside the dialog
    const focusTimeout = setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      focusable?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(focusTimeout);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])"
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const content = (
    <div
      className="modal-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      <div
        ref={dialogRef}
        className={`modal ${sizeClass[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && !ariaLabelledBy && (
          <h2 className="modal-title">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

type ActionsProps = {
  children: ReactNode;
};

Modal.Actions = function ModalActions({ children }: ActionsProps) {
  return <div className="modal-actions">{children}</div>;
};

type BodyProps = {
  children: ReactNode;
};

Modal.Body = function ModalBody({ children }: BodyProps) {
  return <div className="modal-body">{children}</div>;
};
