import { notFound } from "next/navigation";
import { koreanCourse } from "@/lib/kr/content/modules";
import { LessonPlayer } from "./_components/LessonPlayer";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const mod = koreanCourse.modules.find((m) => m.slug === moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === lessonSlug);

  if (!mod || !lesson) {
    notFound();
  }

  const currentIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  const nextLesson = mod.lessons[currentIndex + 1];

  return (
    <LessonPlayer
      lesson={lesson}
      moduleSlug={mod.slug}
      nextLessonSlug={nextLesson?.slug}
      nextLessonTitle={nextLesson?.title}
    />
  );
}
