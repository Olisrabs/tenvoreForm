"use client";

import AppHeader from "./AppHeader";

export default function SuccessScreen({
  name,
  isDuplicate,
  onRestart,
}: {
  name?: string;
  isDuplicate?: boolean;
  onRestart: () => void;
}) {
  const greeting = name ? `Thank you, ${name.split(" ")[0]}.` : "Thank you so much.";

  const content = (
    <>
      <div className="success-icon">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="success-title">{greeting}</h1>
      <p className="success-sub">
        {isDuplicate
          ? "It looks like you're already on the waitlist! We love your enthusiasm and will notify you directly via the details provided the moment your early access is ready."
          : "You're officially on the waitlist! We will notify you directly via the details provided the moment your early access is ready."}
      </p>

      <button className="btn-continue" onClick={onRestart}>
        Back to Start
      </button>
    </>
  );

  return (
    <>
      {/* Mobile */}
      <div className="page-shell">
        <div className="mobile-card">
          <AppHeader />
          <div className="success-screen fade-up">{content}</div>
        </div>
      </div>

      {/* Desktop */}
      <div className="success-desktop fade-up">
        <div className="success-card">{content}</div>
      </div>
    </>
  );
}
