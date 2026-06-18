import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-hello">
          <span className="hero-hello-dot"></span>
          <span>Hi! I&apos;m Wuko, your language buddy.</span>
        </div>
        <h1 className="hero-headline">
          Learn a <span className="underline-teal">language</span>
          <br />
          one fun <span className="underline-gold">sound</span> at a time.
        </h1>
        <p className="hero-sub">
          Wuko Lingo makes learning a language feel less like school.
        </p>
        <div className="hero-actions">
          <Button variant="primary" href="#courses">
            Let&apos;s go! →
          </Button>
          <Button variant="ghost" href="#how">
            How it works
          </Button>
        </div>
      </div>

      <div className="hero-illo">
        <div className="wuko-card">
          <div className="wuko-speech">안녕! Hi!</div>
          <div className="wuko-card-tag">say hi!</div>
          <Image
            src="/mascot/wuko-wave.png"
            alt="Wuko the teal nine-tailed fox waving hello"
            width={380}
            height={380}
            priority
            className="wuko-image"
          />
        </div>
      </div>
    </section>
  );
}
