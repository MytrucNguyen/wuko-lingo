import Link from "next/link";

export function Courses() {
  return (
    <section className="courses" id="courses">
      <div className="courses-head">
        <div className="section-eyebrow">pick your favorite</div>
        <h2 className="section-title">Which language calls to you?</h2>
        <p className="section-sub">
          Korean is ready to play with. I&apos;m busy writing the others, and they&apos;ll be here soon!
        </p>
      </div>

      <div className="courses-grid">
        <Link href="/kr" className="course available">
          <div className="course-corner-note">start here!</div>
          <div className="course-script">한글</div>
          <div className="course-meta">
            <div className="course-name">Korean</div>
            <div className="course-native">Hangul · 한국어</div>
            <div className="course-status">Ready!</div>
          </div>
        </Link>
        <div className="course disabled">
          <div className="course-script">日本語</div>
          <div className="course-meta">
            <div className="course-name">Japanese</div>
            <div className="course-native">Nihongo</div>
            <div className="course-status">Soon</div>
          </div>
        </div>
        <div className="course disabled">
          <div className="course-script">Tiếng Việt</div>
          <div className="course-meta">
            <div className="course-name">Vietnamese</div>
            <div className="course-native">Quốc ngữ</div>
            <div className="course-status">Soon</div>
          </div>
        </div>
        <div className="course disabled">
          <div className="course-script">Español</div>
          <div className="course-meta">
            <div className="course-name">Spanish</div>
            <div className="course-native">Castellano</div>
            <div className="course-status">Soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}
