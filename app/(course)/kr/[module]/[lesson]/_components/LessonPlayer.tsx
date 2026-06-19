"use client";

import { useState, useMemo } from "react";
import type { Lesson, Exercise } from "@/lib/kr/types";
import { LessonShell } from "./LessonShell";
import { MeetScreen } from "./MeetScreen";
import { RecallScreen } from "./RecallScreen";
import { RecognizeScreen } from "./RecognizeScreen";
import { ExercisePlaceholder } from "./ExercisePlaceholder";
import { LessonComplete } from "./LessonComplete";

type ExerciseStatus = "pending" | "correct" | "wrong" | "review-correct";

type Props = {
  lesson: Lesson;
  moduleSlug: string;
};

export function LessonPlayer({ lesson, moduleSlug }: Props) {
  // Queue of exercise IDs in order they should appear
  const initialQueue = useMemo(() => lesson.exercises.map((e) => e.id), [lesson]);
  const [queue, setQueue] = useState<string[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, ExerciseStatus>>({});
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const exerciseById = useMemo(() => {
    const map: Record<string, Exercise> = {};
    for (const ex of lesson.exercises) map[ex.id] = ex;
    return map;
  }, [lesson]);

  const advance = () => {
    if (currentIndex >= queue.length - 1) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

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

    // Wrong answer
    setStatuses((s) => ({ ...s, [currentId]: "wrong" }));

    // If this is the second attempt or more, just advance (no infinite loop)
    if (attemptCount >= 2) {
      advance();
      return;
    }

    // Otherwise, requeue at the end and advance
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
          stats={{
            total,
            correctFirstTry,
            reviewedAndGot,
            needsReview,
          }}
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
      {exercise.type === "recognize" && (
        <RecognizeScreen
          key={exercise.id + currentIndex}
          exercise={exercise}
          onAnswer={handleAnswer}
        />
      )}
      {!["meet", "recall", "recognize"].includes(exercise.type) && (
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
