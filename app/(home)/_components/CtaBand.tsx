import { Button } from "@/components/Button";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-card">
        <div className="cta-doodle d1">✦</div>
        <div className="cta-doodle d2">✦</div>
        <div className="cta-doodle d3">✦</div>
        <h2 className="cta-title">Ready when you are.</h2>
        <p className="cta-sub">I&apos;ll meet you at lesson one.</p>
        <Button variant="cta" href="/kr">
          Start Korean
        </Button>
      </div>
    </section>
  );
}
