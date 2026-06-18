export function BackgroundDoodles() {
  return (
    <>
      <div className="doodle star1">✦</div>
      <div className="doodle star2">✦</div>
      <div className="doodle star3">✦</div>
      <svg
        className="doodle squiggle1"
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 10 Q15 2, 30 10 T58 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="doodle squiggle2"
        width="80"
        height="24"
        viewBox="0 0 80 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12 Q20 2, 40 12 T78 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </>
  );
}
