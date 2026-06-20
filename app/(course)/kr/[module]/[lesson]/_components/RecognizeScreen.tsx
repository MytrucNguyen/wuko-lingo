"use client";

import { useEffect, useMemo } from "react";
import { ChoiceScreen } from "./ChoiceScreen";
import { useSpeech } from "@/lib/kr/useSpeech";
import type { Exercise, Jamo } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function audioFor(jamo: Jamo) {
  return jamo.kind === "consonant" ? jamo.soundHint : jamo.audioHint;
}

export function RecognizeScreen({ exercise, onAnswer }: Props) {
  const { speak, supported, voicesLoading, speaking } = useSpeech();
  const target = exercise.target;
  const audioText = typeof target === "string" ? null : audioFor(target);

  useEffect(() => {
    if (!audioText) return;
    const timer = setTimeout(() => {
      speak(audioText);
    }, 400);
    return () => clearTimeout(timer);
  }, [audioText, speak]);

  const shuffledOptions = useMemo(() => {
    if (!exercise.options) return [];
    const jamoOptions = exercise.options.filter(
      (o): o is Jamo => typeof o !== "string"
    );
    return shuffle(jamoOptions).map((j) => ({
      jamo: j,
      label: <span className="choice-option-letter">{j.char}</span>,
    }));
  }, [exercise.id]);

  if (typeof target === "string") return null;

  const handleReplay = () => {
    if (audioText) speak(audioText);
  };

  return (
    <ChoiceScreen
      prompt={exercise.prompt}
      note={exercise.note}
      display={
        <button
          className="recognize-speaker"
          data-state={voicesLoading ? "loading" : speaking ? "playing" : "idle"}
          onClick={handleReplay}
          aria-label={voicesLoading ? "Loading audio" : speaking ? "Playing" : "Replay sound"}
          disabled={!supported || voicesLoading}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
            <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
            <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      }
      options={shuffledOptions}
      correctJamo={target}
      onAnswer={onAnswer}
    />
  );
}
