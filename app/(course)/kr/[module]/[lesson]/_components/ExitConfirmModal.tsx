"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";

type Props = {
  moduleSlug: string;
  open: boolean;
  onCancel: () => void;
};

export function ExitConfirmModal({ moduleSlug, open, onCancel }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="exit-modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
    >
      <div
        className="exit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="exit-modal-title" className="exit-modal-title">
          Leave this lesson?
        </h2>
        <p className="exit-modal-body">
          Your progress in this lesson will not be saved. You can come back and start it again any time.
        </p>
        <div className="exit-modal-actions">
          <Button variant="destructive" href={`/kr/${moduleSlug}`}>
            Leave lesson
          </Button>
          <Button variant="primary" onClick={onCancel}>
            Keep going
          </Button>
        </div>
      </div>
    </div>
  );
}
