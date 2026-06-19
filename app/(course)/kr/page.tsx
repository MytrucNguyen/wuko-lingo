import Link from "next/link";
import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { WukoNote } from "@/components/WukoNote";
import { koreanCourse } from "@/lib/kr/content/modules";

export default function KoreanCoursePage() {
  return (
    <>
      <Nav />
      <main className="course-page">
        <header className="course-head">
          <span className="course-eyebrow">course</span>
          <h1 className="course-title">
            <span className="course-script">{koreanCourse.script}</span>
            <span className="course-name">{koreanCourse.language}</span>
          </h1>
          <p className="course-native">{koreanCourse.nativeName}</p>
        </header>

        <WukoNote label="did you know?" size="lg">
          <h2 className="wuko-note-title">A short history of Hangul</h2>
          {koreanCourse.history.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </WukoNote>

        <section className="course-modules">
          <h2 className="section-title-left">Modules</h2>
          <div className="modules-list">
            {koreanCourse.modules.map((mod, i) => (
              <Link
                key={mod.id}
                href={`/kr/${mod.slug}`}
                className="module-card"
                data-color={i % 3}
              >
                <div className="module-card-num">{mod.number}</div>
                <div className="module-card-body">
                  <h3 className="module-card-title">{mod.title}</h3>
                  <p className="module-card-blurb">{mod.blurb}</p>
                </div>
                <div className="module-card-meta">
                  <strong>{mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}</strong>
                  <span>~{mod.estimatedMinutes} min</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
