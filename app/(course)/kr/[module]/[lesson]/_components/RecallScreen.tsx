"use client";

import { useMemo } from "react";
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

function getSoundLabel(jamo: Jamo) {
  return <span className="choice-option-letter">{jamo.romanization}</span>;
}

export function RecallScreen({ exercise, onAnswer }: Props) {
  const { speak, supported } = useSpeech();
  const target = exercise.target;

  const shuffledOptions = useMemo(() => {
    if (!exercise.options) return [];
    const jamoOptions = exercise.options.filter(
      (o): o is Jamo => typeof o !== "string"
    );
    return shuffle(jamoOptions).map((j) => ({
      jamo: j,
      label: getSoundLabel(j),
    }));
  }, [exercise.id]);

  if (typeof target === "string") return null;

  const handleTapLetter = () => {
    if (supported) speak(audioFor(target));
  };

  return (
    <ChoiceScreen
      prompt={exercise.prompt}
      note={exercise.note}
      display={
        <button
          className="choice-letter choice-letter-tappable"
          onClick={handleTapLetter}
          aria-label="Hear this letter"
          type="button"
        >
          {target.char}
        </button>
      }
      options={shuffledOptions}
      correctJamo={target}
      onAnswer={onAnswer}
    />
  );
}
