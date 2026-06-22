"use client";

import { useMemo } from "react";
import { ChoiceScreen } from "./ChoiceScreen";
import { Button } from "@/components/Button";
import { useSpeech } from "@/lib/kr/useSpeech";
import type { Exercise, Jamo } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
};

function shuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function audioFor(jamo: Jamo) {
  return jamo.kind === "consonant" ? jamo.soundHint : jamo.audioHint;
}

function getSoundLabel(jamo: Jamo) {
  const label = jamo.kind === "consonant" ? jamo.soundRoman : jamo.romanization;
  return <span className="choice-option-letter">{label}</span>;
}

export function RecallScreen({ exercise, onAnswer }: Props) {
  const { speak, supported } = useSpeech();
  const target = exercise.target;

  const shuffledOptions = useMemo(() => {
    if (!exercise.options) return [];
    const jamoOptions = exercise.options.filter(
      (o): o is Jamo => typeof o !== "string"
    );
    return shuffle(jamoOptions, exercise.id).map((j) => ({
      jamo: j,
      label: getSoundLabel(j),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  if (typeof target === "string") return null;

  const handleTapLetter = () => {
    if (supported) speak(audioFor(target));
  };

  const prompt =
    target.kind === "consonant"
      ? "How do you read this?"
      : "What sound does this letter make?";

  const display = target.kind === "consonant" ? target.soundHint : target.char;

  return (
    <ChoiceScreen
      prompt={prompt}
      note={exercise.note}
      display={
        <Button
          variant="bare"
          className="choice-letter choice-letter-tappable"
          onClick={handleTapLetter}
          ariaLabel="Hear this"
        >
          {display}
        </Button>
      }
      options={shuffledOptions}
      correctJamo={target}
      onAnswer={onAnswer}
    />
  );
}
