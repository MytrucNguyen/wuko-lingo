"use client";

import { useState } from "react";
import type { Lesson } from "@/lib/kr/types";
import { LessonShell } from "./LessonShell";
import { MeetScreen } from "./MeetScreen";
import { ExercisePlaceholder } from "./ExercisePlaceholder";
import { LessonComplete } from "./LessonComplete";

type Props = {
  lesson: Lesson;
  moduleSlug: string;
};

export function LessonPlayer({ lesson, moduleSlug }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  const handleNext = () => {
    if (currentIndex === lesson.exercises.length - 1) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  if (done) {
    return (
      <LessonShell
        moduleSlug={moduleSlug}
        progressTotal={lesson.exercises.length}
        progressCurrent={lesson.exercises.length}
        showProgress={false}
      >
        <LessonComplete lesson={lesson} moduleSlug={moduleSlug} />
      </LessonShell>
    );
  }

  const exercise = lesson.exercises[currentIndex];
  const canGoBack = currentIndex > 0;

  return (
    <LessonShell
      moduleSlug={moduleSlug}
      progressTotal={lesson.exercises.length}
      progressCurrent={currentIndex}
    >
      {exercise.type === "meet" ? (
        <MeetScreen
          key={exercise.id}
          exercise={exercise}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      ) : (
        <ExercisePlaceholder
          key={exercise.id}
          exercise={exercise}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
        />
      )}
    </LessonShell>
  );
}
