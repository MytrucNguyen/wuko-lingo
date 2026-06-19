import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { WukoNote } from "@/components/WukoNote";
import { koreanCourse } from "@/lib/kr/content/modules";

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

  return (
    <>
      <Nav />
      <main className="course-page">
        <Link href={`/kr/${mod.slug}`} className="course-back">← Back to {mod.title}</Link>

        <header className="course-head">
          <span className="course-eyebrow">lesson {lesson.number}</span>
          <h1 className="section-title-left" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            {lesson.title}
          </h1>
          <p className="module-blurb">{lesson.blurb}</p>
        </header>

        <WukoNote label="coming soon">
          The actual exercise player is the next thing we build. For now, here is what this lesson contains.
        </WukoNote>

        <section className="exercises-preview">
          <h2 className="section-title-left">Exercises in this lesson</h2>
          <ol className="exercises-list">
            {lesson.exercises.map((ex) => (
              <li key={ex.id} className="exercise-row">
                <span className="exercise-type">{ex.type}</span>
                <span className="exercise-prompt">{ex.prompt}</span>
                <span className="exercise-time">~{ex.estimatedSeconds}s</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
