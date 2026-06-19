import Link from "next/link";
import type { ReactNode } from "react";

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
  return (
    <div className="lesson-shell">
      <header className="lesson-shell-top">
        <Link href={`/kr/${moduleSlug}`} className="lesson-exit" aria-label="Exit lesson">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </Link>
        {showProgress && (
          <div className="lesson-progress" role="progressbar" aria-valuenow={progressCurrent} aria-valuemin={0} aria-valuemax={progressTotal}>
            {Array.from({ length: progressTotal }, (_, i) => (
              <span
                key={i}
                className={`lesson-progress-dot ${i < progressCurrent ? "done" : i === progressCurrent ? "current" : ""}`}
              />
            ))}
          </div>
        )}
        <span className="lesson-shell-spacer" aria-hidden="true" />
      </header>
      <main className="lesson-shell-body">{children}</main>
    </div>
  );
}
