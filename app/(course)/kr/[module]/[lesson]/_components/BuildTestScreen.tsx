"use client";

import { useState, useEffect, useRef } from "react";
import { WukoNote } from "@/components/WukoNote";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { useSpeech } from "@/lib/kr/useSpeech";
import { useSoundFeedback } from "@/lib/kr/useSoundFeedback";
import type { Exercise, Jamo, Consonant, Vowel } from "@/lib/kr/types";

const CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNGSEONG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

function compose(c: string, v: string): string | null {
  const ci = CHOSEONG.indexOf(c);
  const vi = JUNGSEONG.indexOf(v);
  if (ci < 0 || vi < 0) return null;
  return String.fromCharCode(0xac00 + ci * 588 + vi * 28);
}

function decompose(syllable: string): { c: string; v: string } | null {
  const code = syllable.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return null;
  const ci = Math.floor(code / 588);
  const vi = Math.floor((code % 588) / 28);
  return { c: CHOSEONG[ci], v: JUNGSEONG[vi] };
}

type Props = {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  listen?: boolean;
};

type State = "idle" | "selected" | "correct" | "wrong" | "show-correct";

export function BuildTestScreen({ exercise, onAnswer, listen = false }: Props) {
  const target = typeof exercise.target === "string" ? exercise.target : "";
  const answer = decompose(target);
  const { speak, supported } = useSpeech();
  const { playCorrect, playWrong } = useSoundFeedback();

  const jamo = (exercise.options ?? []).filter(
    (o): o is Jamo => typeof o !== "string"
  );
  const consonants = jamo.filter((j): j is Consonant => j.kind === "consonant");
  const vowels = jamo.filter((j): j is Vowel => j.kind === "vowel");

  const ansC = consonants.find((c) => answer && c.char === answer.c);
  const ansV = vowels.find((v) => answer && v.char === answer.v);
  const targetRoman =
    ansC && ansV
      ? (ansC.char === "ㅇ" ? "" : ansC.romanization.split("/")[0]) + ansV.romanization
      : "";

  const [selC, setSelC] = useState<Consonant | null>(null);
  const [selV, setSelV] = useState<Vowel | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!listen || !supported) return;
    const t = setTimeout(() => speak(target), 400);
    return () => clearTimeout(t);
  }, [listen, supported, target, speak]);

  const built = selC && selV ? compose(selC.char, selV.char) : null;

  const handleCheck = () => {
    if (revealed || !selC || !selV) return;
    const correct = built === target;
    setRevealed(true);
    setWasCorrect(correct);
    if (correct) {
      playCorrect();
      if (supported) speak(target);
      advanceTimer.current = setTimeout(() => onAnswer(true), 1000);
    } else {
      playWrong();
      if (supported) speak(target);
    }
  };

  const handleContinue = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (wasCorrect === null) return;
    onAnswer(wasCorrect);
  };

  const cState = (c: Consonant): State => {
    if (!revealed) return selC?.char === c.char ? "selected" : "idle";
    if (answer && c.char === answer.c) return wasCorrect ? "correct" : "show-correct";
    if (selC?.char === c.char) return "wrong";
    return "idle";
  };

  const vState = (v: Vowel): State => {
    if (!revealed) return selV?.char === v.char ? "selected" : "idle";
    if (answer && v.char === answer.v) return wasCorrect ? "correct" : "show-correct";
    if (selV?.char === v.char) return "wrong";
    return "idle";
  };

  return (
    <div className="build-screen">
      {exercise.note && <WukoNote label="your turn">{exercise.note}</WukoNote>}
      <p className="meet-screen-prompt">{exercise.prompt}</p>

      {listen ? (
        <Button
          variant="bare"
          className="buildtest-listen"
          onClick={() => {
            if (supported) speak(target);
          }}
          ariaLabel="Play the sound again"
        >
          <span className="buildtest-listen-icon">
            <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
              <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
              <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="buildtest-target-hint">tap to hear again</span>
        </Button>
      ) : (
        <Button
          variant="bare"
          className="buildtest-target"
          onClick={() => {
            if (supported) speak(target);
          }}
          ariaLabel={`Hear the sound ${targetRoman}`}
        >
          <span className="buildtest-target-sound">/{targetRoman}/</span>
          <span className="buildtest-target-hint">tap to hear</span>
        </Button>
      )}

      <div className="build-picker">
        <div className="build-picker-row">
          <div className="build-row-label">
            Consonant <span>· initial</span>
          </div>
          <div className="build-options">
            {consonants.map((c) => (
              <Button
                key={c.char}
                variant="bare"
                className="build-option"
                dataState={cState(c)}
                onClick={() => !revealed && setSelC(c)}
                disabled={revealed}
                ariaLabel={`Consonant ${c.romanization}`}
              >
                <span className="build-option-letter">{c.char}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="build-picker-row">
          <div className="build-row-label">
            Vowel <span>· medial</span>
          </div>
          <div className="build-options">
            {vowels.map((v) => (
              <Button
                key={v.char}
                variant="bare"
                className="build-option"
                dataState={vState(v)}
                onClick={() => !revealed && setSelV(v)}
                disabled={revealed}
                ariaLabel={`Vowel ${v.romanization}`}
              >
                <span className="build-option-letter">{v.char}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {!revealed && (
        <Button
          variant="primary"
          onClick={handleCheck}
          disabled={!selC || !selV}
        >
          Check
        </Button>
      )}

      {revealed && !wasCorrect && answer && (
        <div className="buildtest-correction">
          It was {answer.c} + {answer.v}
        </div>
      )}

      {revealed && (
        <div className="meet-nav">
          <IconButton variant="primary" onClick={handleContinue} ariaLabel="Continue">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
}
