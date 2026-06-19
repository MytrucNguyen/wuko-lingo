"use client";

import Image from "next/image";

type Props = {
  message: string;
  eyebrow: string;
  onContinue: () => void;
  onBack?: () => void;
  canGoBack: boolean;
};

export function PhaseTransitionScreen({ message, eyebrow, onContinue, onBack, canGoBack }: Props) {
  return (
    <div className="phase-transition">
      <div className="phase-transition-mascot">
        <Image
          src="/mascot/wuko-wave.png"
          alt=""
          width={260}
          height={260}
          priority
        />
      </div>
      <p className="phase-transition-eyebrow">{eyebrow}</p>
      <p className="phase-transition-message">{message}</p>

      <div className="meet-nav">
        <button
          className="meet-nav-btn meet-nav-back"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Previous exercise"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 5 L7 12 L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <button
          className="meet-nav-btn meet-nav-forward"
          onClick={onContinue}
          aria-label="Continue"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
