import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  label?: string;
  size?: "sm" | "lg";
  children: ReactNode;
};

export function WukoNote({ label = "psst", size = "sm", children }: Props) {
  const isLg = size === "lg";
  const imgSize = isLg ? 100 : 88;

  const body = (
    <div className="wuko-note-body">
      <span className="wuko-note-label">{label}</span>
      <div className="wuko-note-content">{children}</div>
    </div>
  );

  const mascot = (
    <div className="wuko-note-mascot">
      <Image
        src="/mascot/wuko-think.png"
        alt=""
        width={imgSize}
        height={imgSize}
        className="wuko-note-img"
      />
    </div>
  );

  return (
    <div className={`wuko-note size-${size}`}>
      {isLg ? (
        <>
          {body}
          {mascot}
        </>
      ) : (
        <>
          {mascot}
          {body}
        </>
      )}
    </div>
  );
}
