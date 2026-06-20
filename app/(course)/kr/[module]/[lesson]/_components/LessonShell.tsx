"use client";

import { useState, type ReactNode } from "react";
import { IconButton } from "@/components/IconButton";
import { ExitConfirmModal } from "./ExitConfirmModal";

type Props = {
  moduleSlug: string;
  progressTotal: number;
  progressCurrent: number;
  showProgress?: boolean;
  children: ReactNode;
};

export function LessonShell({
  moduleSlug,
  progressTotal,
  progressCurrent,
  showProgress = true,
  children,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="lesson-shell">
      <header className="lesson-shell-top">
        <IconButton
          variant="chrome"
          size="sm"
          onClick={() => setConfirmOpen(true)}
          ariaLabel="Exit lesson"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </IconButton>
        {showProgress && (
          <div
            className="lesson-progress"
            role="progressbar"
            aria-valuenow={progressCurrent}
            aria-valuemin={0}
            aria-valuemax={progressTotal}
            aria-label={`Lesson progress: ${progressCurrent} of ${progressTotal}`}
          >
            {Array.from({ length: progressTotal }, (_, i) => (
              <span
                key={i}
                className={`lesson-progress-dot ${i < progressCurrent ? "done" : i === progressCurrent ? "current" : ""}`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
        <span className="lesson-shell-spacer" aria-hidden="true" />
      </header>
      <main className="lesson-shell-body">{children}</main>

      <ExitConfirmModal
        moduleSlug={moduleSlug}
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
