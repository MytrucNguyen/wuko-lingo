export function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="how-head">
        <div className="section-eyebrow">here&apos;s how we do it</div>
        <h2 className="section-title">Three steps, every lesson.</h2>
        <p className="section-sub">
          Built on real research about how brains actually learn languages.
          Designed so it doesn&apos;t feel like work.
        </p>
      </div>

      <div className="how-cards">
        <div className="how-card">
          <div className="how-card-num">1</div>
          <div className="how-card-icon">
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M14 32 Q14 24 22 24 Q30 24 30 32 Q30 40 22 40"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M32 22 Q40 22 40 32 Q40 42 32 42"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M44 18 Q54 18 54 32 Q54 46 44 46"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>
          <h3 className="how-card-title">Hear it first.</h3>
          <p className="how-card-body">
            Every letter, word, and sentence plays out loud. You meet the
            language with your ears before your eyes, just like it actually
            works in your head.
          </p>
        </div>

        <div className="how-card">
          <div className="how-card-num">2</div>
          <div className="how-card-icon">
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M50 32 A18 18 0 1 1 32 14"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M32 14 L42 14 L42 6 L50 14 L42 22 L42 14"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="44" r="3" fill="currentColor" />
            </svg>
          </div>
          <h3 className="how-card-title">Recall, don&apos;t review.</h3>
          <p className="how-card-body">
            Quick quiz games make you produce the answer, not just recognize it.
            Anything you miss comes back sooner, so your weak spots get extra love.
          </p>
        </div>

        <div className="how-card">
          <div className="how-card-num">3</div>
          <div className="how-card-icon">
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 8 L32 56"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M8 32 L56 32"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M15 15 L49 49"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M49 15 L15 49"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="32" cy="32" r="6" fill="currentColor" />
            </svg>
          </div>
          <h3 className="how-card-title">Build it yourself.</h3>
          <p className="how-card-body">
            You snap syllables, words, and sentences together with your own
            paws. I&apos;ll cheer you on as the pieces click. That's how it sticks..
          </p>
        </div>
      </div>
    </section>
  );
}
