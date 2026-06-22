"use client";

import { useState } from "react";
import { useSpeech } from "@/lib/kr/useSpeech";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { WukoNote } from "@/components/WukoNote";
import type { Exercise, Jamo, Consonant, Vowel } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onNext: () => void;
  onBack?: () => void;
  canGoBack: boolean;
};

const CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNGSEONG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

function compose(consonant: string, vowel: string): string | null {
  const ci = CHOSEONG.indexOf(consonant);
  const vi = JUNGSEONG.indexOf(vowel);
  if (ci < 0 || vi < 0) return null;
  return String.fromCharCode(0xac00 + ci * 588 + vi * 28);
}

function blockRomanization(consonant: Consonant, vowel: Vowel): string {
  const initial = consonant.char === "ㅇ" ? "" : consonant.romanization.split("/")[0];
  return initial + vowel.romanization;
}

export function BuildScreen({ exercise, onNext, onBack, canGoBack }: Props) {
  const { speak, supported } = useSpeech();

  const jamo = (exercise.options ?? []).filter(
    (o): o is Jamo => typeof o !== "string"
  );
  const consonants = jamo.filter((j): j is Consonant => j.kind === "consonant");
  const vowels = jamo.filter((j): j is Vowel => j.kind === "vowel");

  const [consonant, setConsonant] = useState<Consonant | null>(null);
  const [vowel, setVowel] = useState<Vowel | null>(null);
  const [hasBuilt, setHasBuilt] = useState(false);

  const block = consonant && vowel ? compose(consonant.char, vowel.char) : null;

  const pickConsonant = (c: Consonant) => {
    setConsonant(c);
    if (vowel) {
      setHasBuilt(true);
      const composed = compose(c.char, vowel.char);
      if (composed && supported) speak(composed);
    }
  };

  const pickVowel = (v: Vowel) => {
    setVowel(v);
    if (consonant) {
      setHasBuilt(true);
      const composed = compose(consonant.char, v.char);
      if (composed && supported) speak(composed);
    }
  };

  const replay = () => {
    if (block && supported) speak(block);
  };

  return (
    <div className="build-screen">
      {exercise.note && <WukoNote label="how this works">{exercise.note}</WukoNote>}
      <p className="meet-screen-prompt">{exercise.prompt}</p>

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
                dataState={consonant?.char === c.char ? "selected" : "idle"}
                onClick={() => pickConsonant(c)}
                ariaLabel={`Consonant ${c.romanization}`}
              >
                <span className="build-option-letter">{c.char}</span>
                <span className="build-option-roman">{c.romanization}</span>
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
                dataState={vowel?.char === v.char ? "selected" : "idle"}
                onClick={() => pickVowel(v)}
                ariaLabel={`Vowel ${v.romanization}`}
              >
                <span className="build-option-letter">{v.char}</span>
                <span className="build-option-roman">{v.romanization}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="build-result">
        {block && consonant && vowel ? (
          <>
            <div className="build-equation">
              <div className="build-skeleton" data-orientation={vowel.orientation}>
                <span className="build-cell build-cell-c">{consonant.char}</span>
                <span className="build-cell build-cell-v">{vowel.char}</span>
              </div>
              <span className="build-equals" aria-hidden="true">=</span>
              <div className="build-block-tile">
                <span className="build-block-letter">{block}</span>
                {supported && (
                  <Button
                    variant="bare"
                    className="build-block-speaker"
                    onClick={replay}
                    ariaLabel="Hear this syllable"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path d="M3 10 L3 14 L7 14 L12 18 L12 6 L7 10 Z" fill="currentColor" />
                      <path d="M15 9 Q17 12 15 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                      <path d="M17 7 Q21 12 17 17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
            <span className="build-roman">/ {blockRomanization(consonant, vowel)} /</span>
            <p className="build-rule">
              {vowel.orientation === "vertical"
                ? `${vowel.char} is a vertical vowel, so it stands to the right of the consonant.`
                : `${vowel.char} is a horizontal vowel, so it tucks in underneath the consonant.`}
            </p>
          </>
        ) : (
          <div className="build-result-empty">
            <span className="build-result-qmark">?</span>
            <span className="build-result-hint">
              Pick a consonant and a vowel to build a block.
            </span>
          </div>
        )}
      </div>

      <div className="meet-nav">
        <IconButton
          variant="ghost"
          onClick={onBack}
          disabled={!canGoBack}
          ariaLabel="Previous exercise"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 5 L7 12 L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </IconButton>
        <IconButton
          variant="primary"
          onClick={onNext}
          disabled={!hasBuilt}
          ariaLabel="Next exercise"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
