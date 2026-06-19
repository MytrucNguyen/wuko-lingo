import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <div className="brand-blob">
          <Image
            src="/mascot/wuko-head.png"
            alt=""
            width={36}
            height={36}
            className="brand-blob-img"
          />
        </div>
        <div className="brand-name">
          Wuko <span className="lingo">Lingo</span>
        </div>
      </Link>
      <div className="nav-right">
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#courses">Courses</a>
          <a href="#courses" className="nav-cta">Start free</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
