"use client";

import { useState, useEffect, useRef } from "react";
import { useSoundFeedback } from "@/lib/kr/useSoundFeedback";
import { useSpeech } from "@/lib/kr/useSpeech";
import { IconButton } from "@/components/IconButton";
import { WukoNote } from "@/components/WukoNote";
import type { Exercise, Jamo } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
};

function audioFor(jamo: Jamo) {
  return jamo.kind === "consonant" ? jamo.soundHint : jamo.audioHint;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "");
}

function getAcceptedAnswers(jamo: Jamo): string[] {
  const answers = new Set<string>();
  answers.add(normalize(jamo.romanization));
  jamo.romanization.split("/").forEach((part) => answers.add(normalize(part)));
  if (jamo.soundsLike) answers.add(normalize(jamo.soundsLike.phonetic));
  return Array.from(answers).filter(Boolean);
}

function isAcceptable(input: string, jamo: Jamo): boolean {
  const cleaned = normalize(input);
  if (!cleaned) return false;
  return getAcceptedAnswers(jamo).includes(cleaned);
}

export function ProduceScreen({ exercise, onAnswer }: Props) {
  const { playCorrect, playWrong } = useSoundFeedback();
  const { speak, supported: speechSupported } = useSpeech();
  const inputRef = useRef<HTMLInputElement>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const target = exercise.target;

  useEffect(() => {
    setValue("");
    setRevealed(false);
    setWasCorrect(null);
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      clearTimeout(t);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [exercise.id]);

  if (typeof target === "string") return null;

  const handleSubmit = () => {
    if (revealed || !value.trim()) return;
    const correct = isAcceptable(value, target);
    setRevealed(true);
    setWasCorrect(correct);
    if (correct) {
      playCorrect();
      advanceTimerRef.current = setTimeout(() => onAnswer(true), 900);
    } else {
      playWrong();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAdvance = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (wasCorrect === null) return;
    onAnswer(wasCorrect);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(audioFor(target));
  };

  const handleTapLetter = () => {
    if (speechSupported) speak(audioFor(target));
  };

  return (
    <div className="produce-screen">
      {exercise.note && <WukoNote label="how this works">{exercise.note}</WukoNote>}
      <p className="meet-screen-prompt">{exercise.prompt}</p>

      <button
        type="button"
        className="choice-letter choice-letter-tappable"
        onClick={handleTapLetter}
        aria-label="Hear this letter"
      >
        {target.char}
      </button>

      <div className="produce-input-wrap" data-state={revealed ? (wasCorrect ? "correct" : "wrong") : "idle"}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={revealed}
          placeholder="type the sound"
          className="produce-input"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Type the romanization"
        />
      </div>

      {revealed && wasCorrect === false && (
        <div className="choice-correction">
          <span>It was <strong>{target.romanization}</strong></span>
          {speechSupported && (
            <button
              className="choice-correction-replay"
              onClick={handleReplay}
              aria-label="Hear the correct sound"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
                <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span>hear it</span>
            </button>
          )}
        </div>
      )}

      <div className="meet-nav choice-nav">
        <IconButton
          variant="primary"
          onClick={revealed ? handleAdvance : handleSubmit}
          disabled={!revealed && !value.trim()}
          ariaLabel={revealed ? "Continue" : "Submit"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
