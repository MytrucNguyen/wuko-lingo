import Image from "next/image";

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="how-head">
        <div className="section-eyebrow">here&apos;s how we do it</div>
        <h2 className="section-title">Three things every lesson does.</h2>
        <p className="section-sub">
          Built on real research about how brains pick up languages. Designed so it doesn&apos;t feel like work.
        </p>
      </div>

      <div className="how-cards">
        <div className="how-card">
          <div className="how-card-num">1</div>
          <div className="how-card-mascot">
            <Image src="/mascot/wuko-code.png" alt="" width={120} height={120} />
          </div>
          <h3 className="how-card-title">See it and hear it.</h3>
          <p className="how-card-body">
            Every new letter, word, and sentence shows up with its shape, its sound, and its meaning all at once. Three channels into your brain instead of one.
          </p>
        </div>

        <div className="how-card">
          <div className="how-card-num">2</div>
          <div className="how-card-mascot">
            <Image src="/mascot/wuko-think.png" alt="" width={120} height={120} />
          </div>
          <h3 className="how-card-title">Make it, don&apos;t just recognize it.</h3>
          <p className="how-card-body">
            Every drill asks you to produce the answer, not just spot it in a list. Anything you miss comes back sooner. The struggle is where the learning happens.
          </p>
        </div>

        <div className="how-card">
          <div className="how-card-num">3</div>
          <div className="how-card-mascot">
            <Image src="/mascot/wuko-fix.png" alt="" width={120} height={120} />
          </div>
          <h3 className="how-card-title">Build something real.</h3>
          <p className="how-card-body">
            You snap letters into syllables, syllables into words, words into sentences. By the end of a lesson you have made something you could actually say out loud.
          </p>
        </div>
      </div>
    </section>
  );
}
