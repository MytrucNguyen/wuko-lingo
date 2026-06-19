import { Button } from "@/components/Button";
import type { Lesson } from "@/lib/kr/types";

type Props = {
  lesson: Lesson;
  moduleSlug: string;
};

export function LessonComplete({ lesson, moduleSlug }: Props) {
  return (
    <div className="lesson-complete">
      <p className="lesson-complete-eyebrow">lesson done</p>
      <h2 className="lesson-complete-title">{lesson.title}</h2>
      <p className="lesson-complete-sub">
        You met something new today. That counts.
      </p>
      <div className="lesson-complete-actions">
        <Button variant="primary" href={`/kr/${moduleSlug}`}>Back to module</Button>
        <Button variant="ghost" href="/kr">Korean course</Button>
      </div>
    </div>
  );
}
