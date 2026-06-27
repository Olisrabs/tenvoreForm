"use client";

import { useState } from "react";
import AppHeader from "./AppHeader";

export default function SuccessScreen({
  name,
  isDuplicate,
  referralCode,
  onRestart,
}: {
  name?: string;
  isDuplicate?: boolean;
  referralCode?: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const firstName = name ? name.split(" ")[0] : "";
  const greeting = firstName ? `You're in, ${firstName}! 🎉` : "You're in! 🎉";

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://meritup.com";
  const referralLink = referralCode ? `${baseUrl}?ref=${referralCode}` : "";

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select input text
    }
  };

  const handleCopyCode = async () => {
    if (!referralCode) return;
    const writeup = `Join the MeritUp waitlist to learn tech skills and earn money! Use my phone number "${referralCode}" as your referral code when you sign up at: ${baseUrl}`;
    try {
      await navigator.clipboard.writeText(writeup);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
    }
  };

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
          ? "You're already on the waitlist — we love your enthusiasm! We'll notify you the moment MeritUp launches."
          : "We'll notify you the moment we launch. In the meantime, refer friends and earn your way to the top of our leaderboard."}
      </p>

      {/* Referral share box */}
      {referralLink && (
        <div className="referral-share">
          <div className="referral-share-label">Your Referral Link</div>
          <div className="referral-share-title">
            Share your unique link and get rewarded. 🏆
          </div>
          <div className="referral-link-row">
            <input
              readOnly
              className="referral-link-input"
              value={referralLink}
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="referral-share-hint">
            Your code: <strong style={{ color: "var(--brand)" }}>{referralCode}</strong>
            <button 
              onClick={handleCopyCode} 
              style={{
                background: "var(--brand-light)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                color: "var(--brand)",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "4px",
                marginLeft: "6px",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.15s",
              }}
            >
              {copiedCode ? "✓ Copied Invite!" : "Copy Invite Text"}
            </button>
            <div style={{ marginTop: 6 }}>Every person you refer grant you a reward.</div>
          </div>
        </div>
      )}

      <button className="btn-continue" onClick={onRestart} style={{ marginTop: 4 }}>
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
