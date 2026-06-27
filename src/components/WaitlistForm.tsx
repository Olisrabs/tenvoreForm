"use client";

import { useState } from "react";
import FormShell from "./FormShell";

interface Props {
  data: { name: string; phone_number: string; email?: string; state: string; referral_code?: string };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export default function WaitlistForm({
  data,
  onChange,
  onBack,
  onNext,
  submitting = false,
  submitError = null,
}: Props) {
  const isSelfReferral = data.referral_code?.trim() !== "" && data.referral_code?.trim() === data.phone_number.trim();
  const isValid = data.name.trim() !== "" && data.phone_number.trim() !== "" && data.state !== "" && !isSelfReferral;

  return (
    <FormShell
      step={1}
      onBack={onBack}
      onNext={onNext}
      disabled={!isValid || submitting}
      continueLabel={submitting ? "Securing your spot…" : "Count Me In"}
    >
      <p className="step-badge">MeritUp Early Access · Step 1 of 1</p>
      <h1 className="page-title">Secure your spot</h1>

      <div className="q-block">
        <div className="q-label">What is your full name?</div>
        <div className="q-hint">How should we address you?</div>
        <input id="name" type="text" className="form-input"
          placeholder="e.g. Chukwuemeka Okoro"
          value={data.name} onChange={(e) => onChange("name", e.target.value)} />
      </div>

      <div className="q-block">
        <div className="q-label">Your email address</div>
        <div className="q-hint">We'll send your launch invite & referral link here.</div>
        <input type="email" className="form-input"
          placeholder="e.g. emeka@example.com"
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="q-block">
        <div className="q-label">Your WhatsApp number</div>
        <div className="q-hint">We'll send you early access details via WhatsApp.</div>
        <input type="tel" className="form-input"
          placeholder="e.g. 08012345678"
          value={data.phone_number}
          onChange={(e) => onChange("phone_number", e.target.value)}
        />
      </div>

      <div className="q-block">
        <div className="q-label">Which state are you in?</div>
        <div className="q-hint">Helps us tailor content and roll out regionally.</div>
        <select
          className="form-input"
          value={data.state}
          onChange={(e) => onChange("state", e.target.value)}
        >
          <option value="" disabled>Select your state...</option>
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Referral Code Input */}
      <div className="referral-box">
        <div className="referral-box-text">
          <div className="referral-box-label">Referred by a friend?</div>
          <div className="referral-box-desc">Enter their WhatsApp/phone number to give them credit and get acknowledged in our community.</div>
        </div>
      </div>
      <div className="q-block" style={{ marginTop: -8 }}>
        <input type="tel" className="form-input"
          placeholder="e.g. 08012345678"
          value={data.referral_code || ""}
          onChange={(e) => onChange("referral_code", e.target.value)}
        />
        {data.referral_code?.trim() && data.referral_code.trim() === data.phone_number.trim() && (
          <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 500 }}>
            ⚠️ You cannot use your own phone number as a referral code.
          </p>
        )}
      </div>

      {submitError && (
        <p style={{
          fontSize: 13,
          color: "#e53e3e",
          background: "rgba(229,62,62,0.08)",
          border: "1px solid rgba(229,62,62,0.25)",
          borderRadius: 8,
          padding: "10px 14px",
          marginTop: 4,
          lineHeight: 1.5,
        }}>
          ⚠️ {submitError}
        </p>
      )}

      <p style={{ fontSize: 12, color: "var(--gray-400)", lineHeight: 1.6, marginTop: -8 }}>
        Your information is private and will only be used to notify you about MeritUp's launch.
      </p>
    </FormShell>
  );
}
