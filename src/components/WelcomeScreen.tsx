"use client";

import Image from "next/image";
import AppHeader from "./AppHeader";

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      {/* ── MOBILE ── */}
      <div className="page-shell">
        <div className="mobile-card">
          <AppHeader />
          <div className="card-content fade-up" style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--teal-light)", color: "var(--teal)", fontSize: 11, fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", padding: "5px 12px", borderRadius: 50 }}>
                Business Survey
              </span>
            </div>
            <h1 style={{ fontSize: 25, fontWeight: 800, color: "var(--navy)", lineHeight: 1.25, letterSpacing: -0.5, marginBottom: 14 }}>
              Help us build something you'll actually use
            </h1>
            <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.7, marginBottom: 32 }}>
              We're building software for Nigerian distributors and wholesalers.
              Your honest answers shape what we build first.
            </p>
            <button className="btn-continue btn-continue-full" onClick={onContinue}>
              Start Survey
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p style={{ fontSize: 12, color: "var(--gray-400)", textAlign: "center", marginTop: 16 }}>
              5 steps &nbsp;·&nbsp; 12 questions &nbsp;·&nbsp; ~3 mins
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="welcome-desktop fade-up">
        {/* Left panel — bg.png image with overlay */}
        <div className="welcome-left" style={{ position: "relative", overflow: "hidden" }}>
          {/* Background image */}
          <Image
            src="/bg.png"
            alt="Background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Dark overlay for text legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(13,27,62,0.82) 0%, rgba(13,27,62,0.65) 100%)",
          }} />

          {/* Content sits above overlay */}
          <div className="welcome-left-brand" style={{ position: "relative", zIndex: 1 }}>
            <div className="b-icon-lg">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h4v-6h6v6h4V7L10 2z" fill="white" />
              </svg>
            </div>
            <span className="b-name-lg">Tenvore</span>
          </div>

          <div className="welcome-left-hero" style={{ position: "relative", zIndex: 1 }}>
            <h2>Build with us,<br />not for you.</h2>
            <p>
              We're creating software for Nigerian distributors and
              wholesalers. Every answer you give shapes what gets built first.
              Your input is the product.
            </p>
          </div>

          <div className="welcome-left-footer" style={{ position: "relative", zIndex: 1 }}>
            <div className="welcome-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                3–5 mins
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Confidential
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                12 questions
              </span>
            </div>
          </div>
        </div>

        {/* Right white panel */}
        <div className="welcome-right">
          <div className="welcome-card">
            <div className="wc-eyebrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h4v-6h6v6h4V7L10 2z" fill="currentColor" />
              </svg>
              Business Research
            </div>

            <h1>Help us build something you'll actually use</h1>
            <p>
              We're building software for Nigerian distributors and wholesalers.
              Answer <strong>12 short questions</strong> across 5 steps, takes about
              3 minutes. Your responses are confidential.
            </p>

            <button className="btn-continue" onClick={onContinue} style={{ padding: "14px 32px", fontSize: 15 }}>
              Start Survey
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
