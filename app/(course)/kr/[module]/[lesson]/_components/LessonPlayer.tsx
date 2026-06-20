"use client";

import { useState, useMemo, useCallback } from "react";
import type { Lesson, Exercise } from "@/lib/kr/types";
import { LessonShell } from "./LessonShell";
import { MeetScreen } from "./MeetScreen";
import { RecallScreen } from "./RecallScreen";
import { RecognizeScreen } from "./RecognizeScreen";
import { ProduceScreen } from "./ProduceScreen";
import { ExercisePlaceholder } from "./ExercisePlaceholder";
import { LessonComplete } from "./LessonComplete";
import { PhaseTransitionScreen } from "./PhaseTransitionScreen";

type ExerciseStatus = "pending" | "correct" | "wrong" | "review-correct";

type PhaseTransition = {
  from: Exercise["type"];
  to: Exercise["type"];
  eyebrow: string;
  message: string;
};

const PHASE_TRANSITIONS: PhaseTransition[] = [
  {
    from: "meet",
    to: "recall",
    eyebrow: "nice work",
    message: "You met them all. Time to test what stuck. No pressure.",
  },
  {
    from: "recall",
    to: "recognize",
    eyebrow: "halfway",
    message: "Now we mix it up. Same letters, harder mode.",
  },
  {
    from: "recognize",
    to: "produce",
    eyebrow: "last stretch",
    message: "No more options. Type what you hear in your head. This is what makes it stick.",
  },
];

function findTransition(
  fromType: Exercise["type"] | undefined,
  toType: Exercise["type"] | undefined
): PhaseTransition | null {
  if (!fromType || !toType) return null;
  if (fromType === toType) return null;
  return PHASE_TRANSITIONS.find((t) => t.from === fromType && t.to === toType) || null;
}

type Props = {
  nextLessonSlug?: string;
  nextLessonTitle?: string;
  lesson: Lesson;
  moduleSlug: string;
};

export function LessonPlayer({ lesson, moduleSlug, nextLessonSlug, nextLessonTitle }: Props) {
  const initialQueue = useMemo(() => lesson.exercises.map((e) => e.id), [lesson]);
  const [queue, setQueue] = useState<string[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, ExerciseStatus>>({});
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [transitionShown, setTransitionShown] = useState<Record<number, boolean>>({});
  const [activeTransition, setActiveTransition] = useState<PhaseTransition | null>(null);

  const exerciseById = useMemo(() => {
    const map: Record<string, Exercise> = {};
    for (const ex of lesson.exercises) map[ex.id] = ex;
    return map;
  }, [lesson]);

  const advance = useCallback(() => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      setDone(true);
      return;
    }

    const currentEx = exerciseById[queue[currentIndex]];
    const nextEx = exerciseById[queue[nextIndex]];
    const transition = findTransition(currentEx?.type, nextEx?.type);

    if (transition && !transitionShown[nextIndex]) {
      setActiveTransition(transition);
      setTransitionShown((t) => ({ ...t, [nextIndex]: true }));
      return;
    }

    setCurrentIndex(nextIndex);
  }, [currentIndex, queue, exerciseById, transitionShown]);

  const handleTransitionContinue = useCallback(() => {
    setActiveTransition(null);
    setCurrentIndex((i) => i + 1);
  }, []);

  const handleTransitionBack = useCallback(() => {
    setActiveTransition(null);
    // Stay on current index — user returns to the last exercise they completed
  }, []);

  const handleMeetNext = () => {
    const currentId = queue[currentIndex];
    setStatuses((s) => ({ ...s, [currentId]: "correct" }));
    advance();
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleAnswer = (correct: boolean) => {
    const currentId = queue[currentIndex];
    const attemptCount = (attempts[currentId] || 0) + 1;
    setAttempts((a) => ({ ...a, [currentId]: attemptCount }));

    if (correct) {
      const wasWrongBefore = statuses[currentId] === "wrong";
      setStatuses((s) => ({
        ...s,
        [currentId]: wasWrongBefore ? "review-correct" : "correct",
      }));
      advance();
      return;
    }

    setStatuses((s) => ({ ...s, [currentId]: "wrong" }));

    if (attemptCount >= 2) {
      advance();
      return;
    }

    setQueue((q) => [...q, currentId]);
    advance();
  };

  if (done) {
    const total = lesson.exercises.length;
    const correctFirstTry = lesson.exercises.filter(
      (e) => statuses[e.id] === "correct"
    ).length;
    const reviewedAndGot = lesson.exercises.filter(
      (e) => statuses[e.id] === "review-correct"
    ).length;
    const needsReview = lesson.exercises.filter(
      (e) => statuses[e.id] === "wrong"
    ).length;

    return (
      <LessonShell
        moduleSlug={moduleSlug}
        progressTotal={queue.length}
        progressCurrent={queue.length}
        showProgress={false}
      >
        <LessonComplete
          lesson={lesson}
          moduleSlug={moduleSlug}
          stats={{ total, correctFirstTry, reviewedAndGot, needsReview }}
          nextLessonSlug={nextLessonSlug}
          nextLessonTitle={nextLessonTitle}
        />
      </LessonShell>
    );
  }

  if (activeTransition) {
    return (
      <LessonShell
        moduleSlug={moduleSlug}
        progressTotal={queue.length}
        progressCurrent={currentIndex + 1}
        showProgress
      >
        <PhaseTransitionScreen
          eyebrow={activeTransition.eyebrow}
          message={activeTransition.message}
          onContinue={handleTransitionContinue}
          onBack={handleTransitionBack}
          canGoBack={currentIndex > 0}
        />
      </LessonShell>
    );
  }

  const currentId = queue[currentIndex];
  const exercise = exerciseById[currentId];
  const canGoBack = currentIndex > 0;

  return (
    <LessonShell
      moduleSlug={moduleSlug}
      progressTotal={queue.length}
      progressCurrent={currentIndex}
    >
      {exercise.type === "meet" && (
        <MeetScreen
          key={exercise.id + currentIndex}
          exercise={exercise}
          onNext={handleMeetNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      )}
      {exercise.type === "recall" && (
        <RecallScreen
          key={exercise.id + currentIndex}
          exercise={exercise}
          onAnswer={handleAnswer}
        />
      )}
      {exercise.type === "produce" && (
        <ProduceScreen
          key={exercise.id + currentIndex}
          exercise={exercise}
          onAnswer={handleAnswer}
        />
      )}
      {exercise.type === "recognize" && (
        <RecognizeScreen
          key={exercise.id + currentIndex}
          exercise={exercise}
          onAnswer={handleAnswer}
        />
      )}
      {!["meet", "recall", "recognize", "produce"].includes(exercise.type) && (
        <ExercisePlaceholder
          key={exercise.id + currentIndex}
          exercise={exercise}
          onNext={() => handleAnswer(true)}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      )}
    </LessonShell>
  );
}
