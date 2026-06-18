import Image from "next/image";
import { Nav } from "@/app/_components/Nav";
import { Footer } from "@/app/_components/Footer";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="not-found">
        <div className="not-found-illo">
          <Image
            src="/mascot/wuko-error.png"
            alt="Wuko looks confused, holding a question mark"
            width={320}
            height={320}
            priority
          />
        </div>
        <p className="not-found-eyebrow">oh no</p>
        <h1 className="not-found-title">Wuko got lost!</h1>
        <p className="not-found-sub">
          This page wandered off somewhere. Let&apos;s head back to the start.
        </p>
        <Button variant="primary" href="/">
          Take me home →
        </Button>
      </main>
      <Footer />
    </>
  );
}
