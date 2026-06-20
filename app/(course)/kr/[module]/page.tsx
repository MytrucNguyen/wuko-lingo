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

        <section className="lesson-path">
          <h2 className="section-title-left">Your path</h2>
          <ol className="path-list">
            {mod.lessons.map((lesson, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const isFirst = i === 0;
              const isLast = i === mod.lessons.length - 1;
              return (
                <li
                  key={lesson.id}
                  className={`path-node path-node-${side}`}
                  data-first={isFirst || undefined}
                  data-last={isLast || undefined}
                >
                  {!isFirst && <span className="path-connector" aria-hidden="true" />}
                  <Link
                    href={`/kr/${mod.slug}/${lesson.slug}`}
                    className="path-link"
                  >
                    <div className="path-circle">
                      <span className="path-num">{lesson.number}</span>
                    </div>
                    <div className="path-card">
                      {isFirst && <div className="path-badge">Start here</div>}
                      <h3 className="path-title">{lesson.title}</h3>
                      <p className="path-blurb">{lesson.blurb}</p>
                      <div className="path-meta">
                        <span>{lesson.exercises.length} exercises</span>
                        <span className="path-meta-dot" aria-hidden="true">·</span>
                        <span>~{lesson.estimatedMinutes} min</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
