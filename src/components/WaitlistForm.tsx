"use client";

import { useState } from "react";
import FormShell from "./FormShell";

interface Props {
  data: { name: string; phone_number: string; email?: string; state: string };
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
  const isValid = data.name.trim() !== "" && data.phone_number.trim() !== "" && data.state !== "";

  return (
    <FormShell
      step={1}
      onBack={onBack}
      onNext={onNext}
      disabled={!isValid || submitting}
      continueLabel={submitting ? "Submitting…" : "Count me in"}
    >
      <p className="step-badge">Early Access &nbsp;·&nbsp; Step 1 of 1</p>
      <h1 className="page-title">Secure your spot</h1>

      <div className="q-block">
        <div className="q-label">What is your full name?</div>
        <div className="q-hint">First and last name.</div>
        <input id="name" type="text" className="form-input"
          placeholder="e.g. Chukwuemeka Okoro"
          value={data.name} onChange={(e) => onChange("name", e.target.value)} />
      </div>

      <div className="q-block">
        <div className="q-label">What is your email address?</div>
        <div className="q-hint">Optional. For detailed product updates.</div>
        <input type="email" className="form-input"
          placeholder="e.g. emeka@example.com"
          value={data.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="q-block">
        <div className="q-label">What is your phone number?</div>
        <div className="q-hint">Preferably whatsapp enabled. We'll text you when we launch.</div>
        <input type="tel" className="form-input"
          placeholder="e.g. 08012345678"
          value={data.phone_number}
          onChange={(e) => onChange("phone_number", e.target.value)}
        />
      </div>

      <div className="q-block">
        <div className="q-label">Which state is your business in?</div>
        <div className="q-hint">Helps us roll out regionally.</div>
        <select 
          className="form-input" 
          value={data.state} 
          onChange={(e) => onChange("state", e.target.value)}
        >
          <option value="" disabled>Select a state...</option>
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
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
        Your information is secure and will only be used to notify you about Tenvore's launch.
      </p>
    </FormShell>
  );
}
