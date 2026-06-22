"use client";

import { useSpeech } from "@/lib/kr/useSpeech";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import type { Exercise } from "@/lib/kr/types";

type Props = {
  exercise: Exercise;
  onNext: () => void;
  onBack?: () => void;
  canGoBack: boolean;
};

type Example = {
  c: string;
  v: string;
  block: string;
  orientation: "vertical" | "horizontal";
  rule: string;
};

const EXAMPLES: Example[] = [
  {
    c: "ㄱ",
    v: "ㅏ",
    block: "가",
    orientation: "vertical",
    rule: "Vertical vowels stand to the right of the consonant.",
  },
  {
    c: "ㄱ",
    v: "ㅗ",
    block: "고",
    orientation: "horizontal",
    rule: "Horizontal vowels tuck in underneath it.",
  },
];

export function BlockIntroScreen({ exercise, onNext, onBack, canGoBack }: Props) {
  const { speak, supported } = useSpeech();

  return (
    <div className="intro-screen">
      <p className="meet-screen-prompt">{exercise.prompt}</p>
      {exercise.note && <p className="intro-lede">{exercise.note}</p>}

      <div className="intro-examples">
        {EXAMPLES.map((ex) => (
          <div className="intro-example" key={ex.block}>
            <div className="build-equation">
              <div className="build-skeleton" data-orientation={ex.orientation}>
                <span className="build-cell build-cell-c">{ex.c}</span>
                <span className="build-cell build-cell-v">{ex.v}</span>
              </div>
              <span className="build-equals" aria-hidden="true">=</span>
              <Button
                variant="bare"
                className="build-block-tile intro-block-tile"
                onClick={() => {
                  if (supported) speak(ex.block);
                }}
                ariaLabel={`Hear ${ex.block}`}
              >
                <span className="build-block-letter">{ex.block}</span>
              </Button>
            </div>
            <p className="intro-rule">{ex.rule}</p>
          </div>
        ))}
      </div>

      <div className="meet-nav">
        <IconButton
          variant="ghost"
          onClick={onBack}
          disabled={!canGoBack}
          ariaLabel="Previous"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 5 L7 12 L15 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </IconButton>
        <IconButton variant="primary" onClick={onNext} ariaLabel="Start building">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5 L17 12 L9 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
