import { Button } from "@/components/Button";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-card">
        <div className="cta-doodle d1">✦</div>
        <div className="cta-doodle d2">✦</div>
        <div className="cta-doodle d3">✦</div>
        <h2 className="cta-title">Ready to learn with me?</h2>
        <p className="cta-sub">First lesson takes 5 minutes. I promise it&apos;ll be fun.</p>
        <Button variant="cta" href="/kr">
          Start learning Korean →
        </Button>
      </div>
    </section>
  );
}
