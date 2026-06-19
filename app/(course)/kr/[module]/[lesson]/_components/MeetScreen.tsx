"use client";

import { useEffect } from "react";
import { useSpeech } from "@/lib/kr/useSpeech";
import { WukoNote } from "@/components/WukoNote";
import type { Exercise } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onNext: () => void;
  onBack?: () => void;
  canGoBack: boolean;
};

function highlightHangul(text: string) {
  return text.split(/([ㄱ-ㅎㅏ-ㅣ가-힣]+)/g).map((part, i) => {
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(part)) {
      return <span key={i} className="prompt-hangul">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function MeetScreen({ exercise, onNext, onBack, canGoBack }: Props) {
  const { speak, supported } = useSpeech();
  const target = exercise.target;

  const audioText =
    typeof target === "string"
      ? null
      : target.kind === "consonant"
      ? target.soundHint
      : target.audioHint;

  useEffect(() => {
    if (!audioText) return;
    const timer = setTimeout(() => {
      speak(audioText);
    }, 400);
    return () => clearTimeout(timer);
  }, [audioText, speak]);

  if (typeof target === "string") {
    return null;
  }

  const handleReplay = () => {
    if (audioText) speak(audioText);
  };

  const showMnemonic =
    !target.soundsLike ||
    target.mnemonicHook.toLowerCase() !== target.soundsLike.word.toLowerCase();

  return (
    <div className="meet-screen">
      {exercise.note && (
        <WukoNote label="quick note">{exercise.note}</WukoNote>
      )}

      <p className="meet-screen-prompt">{highlightHangul(exercise.prompt)}</p>

      <div className="meet-letter-card">
        <div className="meet-letter">{target.char}</div>
        <button
          className="meet-speaker"
          onClick={handleReplay}
          aria-label="Replay sound"
          disabled={!supported}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
            <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="meet-letter-romanization">{target.romanization}</div>

      <div className="meet-mnemonic">
        {target.soundsLike && (
          <div className="meet-mnemonic-section">
            <span className="meet-mnemonic-eyebrow meet-mnemonic-eyebrow-pink">sounds like</span>
            <p className="meet-mnemonic-soundslike">
              <strong>{target.soundsLike.word}</strong> ({target.soundsLike.phonetic})
            </p>
          </div>
        )}

        {showMnemonic && (
          <div className={`meet-mnemonic-section ${target.soundsLike ? "meet-mnemonic-section-divider" : ""}`}>
            <span className="meet-mnemonic-eyebrow">remember it as</span>
            <p className="meet-mnemonic-hook">&ldquo;{target.mnemonicHook}&rdquo;</p>
            <p className="meet-mnemonic-shape">{target.mnemonicShape}</p>
          </div>
        )}

        {target.articulation && (
          <div className={`meet-mnemonic-section ${target.soundsLike || showMnemonic ? "meet-mnemonic-section-divider" : ""}`}>
            <span className="meet-mnemonic-eyebrow meet-mnemonic-eyebrow-teal">how to make the sound</span>
            <p className="meet-mnemonic-articulation">{target.articulation}</p>
          </div>
        )}
      </div>

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

      {!supported && (
        <p className="meet-audio-note">Audio playback is not available in this browser.</p>
      )}
    </div>
  );
}
