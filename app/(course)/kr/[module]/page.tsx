import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { koreanCourse } from "@/lib/kr/content/modules";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const mod = koreanCourse.modules.find((m) => m.slug === moduleSlug);

  if (!mod) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="course-page">
        <Link href="/kr" className="course-back">← Back to Korean</Link>

        <header className="course-head">
          <span className="course-eyebrow">module {mod.number}</span>
          <h1 className="section-title-left" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
            {mod.title}
          </h1>
          <p className="module-blurb">{mod.blurb}</p>
        </header>

        <section className="lessons-section">
          <h2 className="section-title-left">Lessons</h2>
          <div className="lessons-list">
            {mod.lessons.map((lesson, i) => (
              <Link
                key={lesson.id}
                href={`/kr/${mod.slug}/${lesson.slug}`}
                className="lesson-card"
              >
                <div className="lesson-card-num">{lesson.number}</div>
                <div className="lesson-card-body">
                  <h3 className="lesson-card-title">{lesson.title}</h3>
                  <p className="lesson-card-blurb">{lesson.blurb}</p>
                </div>
                <div className="lesson-card-meta">
                  <strong>{lesson.exercises.length} exercises</strong>
                  <span>~{lesson.estimatedMinutes} min</span>
                </div>
                {i === 0 && <div className="lesson-badge">Start here</div>}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
