"use client";

import { useEffect, useMemo } from "react";
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
    return shuffle(jamoOptions, exercise.id).map((j) => ({
      jamo: j,
      label: <span className="choice-option-letter">{j.char}</span>,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  if (typeof target === "string") return null;

  const handleReplay = () => {
    if (audioText) speak(audioText);
  };

  const prompt =
    target.kind === "consonant"
      ? "Which letter does this sound start with?"
      : "Which letter makes this sound?";

  return (
    <ChoiceScreen
      prompt={prompt}
      note={exercise.note}
      display={
        <Button
          variant="bare"
          className="recognize-speaker"
          dataState={voicesLoading ? "loading" : speaking ? "playing" : "idle"}
          onClick={handleReplay}
          ariaLabel={voicesLoading ? "Loading audio" : speaking ? "Playing" : "Replay sound"}
          disabled={!supported || voicesLoading}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
            <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
            <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </Button>
      }
      options={shuffledOptions}
      correctJamo={target}
      onAnswer={onAnswer}
    />
  );
}
