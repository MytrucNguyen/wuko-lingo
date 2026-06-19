import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  label?: string;
  children: ReactNode;
};

export function WukoNote({ label = "psst", children }: Props) {
  return (
    <div className="wuko-note">
      <div className="wuko-note-mascot">
        <Image
          src="/mascot/wuko-think.png"
          alt=""
          width={88}
          height={88}
          className="wuko-note-img"
        />
      </div>
      <div className="wuko-note-body">
        <span className="wuko-note-label">{label}</span>
        <div className="wuko-note-content">{children}</div>
      </div>
    </div>
  );
}
