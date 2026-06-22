"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { WukoNote } from "@/components/WukoNote";
import { IconButton } from "@/components/IconButton";
import { Button } from "@/components/Button";
import { useSoundFeedback } from "@/lib/kr/useSoundFeedback";
import { useSpeech } from "@/lib/kr/useSpeech";
import type { Jamo } from "@/lib/kr/types";

type Option = { jamo: Jamo; label: ReactNode };

type Props = {
  prompt: string;
  note?: string;
  display: ReactNode;
  options: Option[];
  correctJamo: Jamo;
  onAnswer: (correct: boolean) => void;
};

function audioFor(jamo: Jamo) {
  return jamo.kind === "consonant" ? jamo.soundHint : jamo.audioHint;
}

export function ChoiceScreen({ prompt, note, display, options, correctJamo, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const { playCorrect, playWrong } = useSoundFeedback();
  const { speak, supported: speechSupported, voicesLoading, speaking } = useSpeech();
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const handlePick = (jamo: Jamo) => {
    if (revealed) return;
    const isCorrect = jamo.char === correctJamo.char;
    setSelected(jamo.char);
    setRevealed(true);
    setWasCorrect(isCorrect);
    if (isCorrect) {
      playCorrect();
      advanceTimerRef.current = setTimeout(() => onAnswer(true), 900);
    } else {
      playWrong();
    }
  };

  const handleAdvance = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (wasCorrect === null) return;
    onAnswer(wasCorrect);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(audioFor(correctJamo));
  };

  const stateFor = (jamo: Jamo): "idle" | "correct" | "wrong" | "show-correct" => {
    if (!revealed) return "idle";
    if (jamo.char === selected && jamo.char === correctJamo.char) return "correct";
    if (jamo.char === selected) return "wrong";
    if (jamo.char === correctJamo.char) return "show-correct";
    return "idle";
  };

  const wasWrong = revealed && wasCorrect === false;

  return (
    <div className="choice-screen">
      {note && <WukoNote label="how this works">{note}</WukoNote>}
      <p className="meet-screen-prompt">{prompt}</p>
      <div className="choice-display">{display}</div>

      <div className={`choice-options choice-options-count-${options.length}`}>
        {options.map((opt) => (
          <Button
            key={opt.jamo.char}
            variant="bare"
            className="choice-option"
            dataState={stateFor(opt.jamo)}
            onClick={() => handlePick(opt.jamo)}
            disabled={revealed}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {wasWrong && (
        <div className="choice-correction">
          <span>It was <strong>{correctJamo.kind === "consonant" ? correctJamo.soundRoman : correctJamo.romanization}</strong></span>
          {speechSupported && (
            <Button
              variant="bare"
              className="choice-correction-replay"
              onClick={handleReplay}
              ariaLabel="Hear the correct sound"
              disabled={voicesLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
                <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span>{speaking ? "playing" : "hear it"}</span>
            </Button>
          )}
        </div>
      )}

      {revealed && (
        <div className="meet-nav choice-nav">
          <IconButton variant="primary" onClick={handleAdvance} ariaLabel="Continue">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
}
