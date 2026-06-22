import { Button } from "@/components/Button";
import type { Lesson } from "@/lib/kr/types";

type Stats = {
  total: number;
  correctFirstTry: number;
  reviewedAndGot: number;
  needsReview: number;
};

type Props = {
  lesson: Lesson;
  moduleSlug: string;
  stats: Stats;
  nextLessonSlug?: string;
  nextLessonTitle?: string;
};

export function LessonComplete({
  lesson,
  moduleSlug,
  stats,
  nextLessonSlug,
  nextLessonTitle,
}: Props) {
  const isExplore = stats.total === 0;
  const allCorrect = stats.needsReview === 0 && stats.reviewedAndGot === 0;
  const someStruggle = stats.reviewedAndGot > 0 || stats.needsReview > 0;
  const hasNext = !!nextLessonSlug;

  return (
    <div className="lesson-complete">
      <p className="lesson-complete-eyebrow">lesson done</p>
      <h2 className="lesson-complete-title">{lesson.title}</h2>
      <p className="lesson-complete-sub">
        {isExplore
          ? "You built your first Korean syllables. Blocks, not letters. That's how Hangul is read."
          : allCorrect
          ? "Clean run. Every answer right the first time."
          : someStruggle
          ? "You met something new today. The parts you missed will come back later."
          : "You met something new today. That counts."}
      </p>

      {!isExplore && (
        <div className="lesson-complete-stats">
          <div className="lesson-stat lesson-stat-correct">
            <div className="lesson-stat-num">{stats.correctFirstTry}</div>
            <div className="lesson-stat-label">first try</div>
          </div>
          {stats.reviewedAndGot > 0 && (
            <div className="lesson-stat lesson-stat-review">
              <div className="lesson-stat-num">{stats.reviewedAndGot}</div>
              <div className="lesson-stat-label">got it on review</div>
            </div>
          )}
          {stats.needsReview > 0 && (
            <div className="lesson-stat lesson-stat-needs">
              <div className="lesson-stat-num">{stats.needsReview}</div>
              <div className="lesson-stat-label">to revisit</div>
            </div>
          )}
        </div>
      )}

      <div className="lesson-complete-actions">
        {hasNext ? (
          <>
            <Button variant="ghost" href={`/kr/${moduleSlug}`}>Back to module</Button>
            <Button variant="primary" href={`/kr/${moduleSlug}/${nextLessonSlug}`}>
              Continue to {nextLessonTitle ? `"${nextLessonTitle}"` : "next lesson"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" href="/kr">Korean course</Button>
            <Button variant="primary" href={`/kr/${moduleSlug}`}>Back to module</Button>
          </>
        )}
      </div>
    </div>
  );
}
