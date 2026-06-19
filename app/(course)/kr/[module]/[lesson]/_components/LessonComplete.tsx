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
};

export function LessonComplete({ lesson, moduleSlug, stats }: Props) {
  const allCorrect = stats.needsReview === 0 && stats.reviewedAndGot === 0;
  const someStruggle = stats.reviewedAndGot > 0 || stats.needsReview > 0;

  return (
    <div className="lesson-complete">
      <p className="lesson-complete-eyebrow">lesson done</p>
      <h2 className="lesson-complete-title">{lesson.title}</h2>
      <p className="lesson-complete-sub">
        {allCorrect
          ? "Clean run. Every answer right the first time."
          : someStruggle
          ? "You met something new today. The parts you missed will come back later."
          : "You met something new today. That counts."}
      </p>

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

      <div className="lesson-complete-actions">
        <Button variant="primary" href={`/kr/${moduleSlug}`}>Back to module</Button>
        <Button variant="ghost" href="/kr">Korean course</Button>
      </div>
    </div>
  );
}
