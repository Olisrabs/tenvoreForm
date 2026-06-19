"use client";

import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import WaitlistForm from "@/components/WaitlistForm";
import SuccessScreen from "@/components/SuccessScreen";
import { submitSurvey, SurveyData } from "@/lib/submitSurvey";

const initial: SurveyData = {
  name: "",
  phone_number: "",
  email: "",
  state: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const update = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setIsDuplicate(false);
    try {
      await submitSurvey(formData);
      next(); // advance to SuccessScreen
    } catch (err) {
      if (err instanceof Error && err.message === "ALREADY_JOINED") {
        setIsDuplicate(true);
        next(); // Also advance to success screen
      } else {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {step === 0 && <WelcomeScreen onContinue={() => setStep(1)} />}

      {step === 1 && (
        <WaitlistForm
          data={formData}
          onChange={update}
          onBack={back}
          submitting={submitting}
          submitError={submitError}
          onNext={handleSubmit}
        />
      )}

      {step === 2 && (
        <SuccessScreen
          name={formData.name}
          isDuplicate={isDuplicate}
          onRestart={() => { setFormData(initial); setIsDuplicate(false); setStep(0); }}
        />
      )}
    </>
  );
}
