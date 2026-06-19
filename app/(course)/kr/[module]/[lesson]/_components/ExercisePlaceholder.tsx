"use client";

import type { Exercise } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onNext: () => void;
  onBack?: () => void;
  canGoBack: boolean;
};

export function ExercisePlaceholder({ exercise, onNext, onBack, canGoBack }: Props) {
  return (
    <div className="placeholder-screen">
      <div className="placeholder-badge">{exercise.type}</div>
      <h2 className="placeholder-title">This exercise type lands soon.</h2>
      <p className="placeholder-prompt">{exercise.prompt}</p>
      <p className="placeholder-note">
        Tap continue to keep moving through the lesson.
      </p>
      <div className="meet-nav">
        <button
          className="meet-nav-btn meet-nav-back"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Previous exercise"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 5 L7 12 L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <button
          className="meet-nav-btn meet-nav-forward"
          onClick={onNext}
          aria-label="Next exercise"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
