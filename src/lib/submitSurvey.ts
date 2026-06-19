import { supabase } from "./supabase";

export interface SurveyData {
  name: string;
  phone_number: string;
  email?: string;
  state: string;
}

export async function submitSurvey(data: SurveyData): Promise<void> {
  const submitted_at = new Date().toISOString();

  // 1. Save to Supabase (this is the critical step — must succeed)
  const { error } = await supabase.from("waitlist_responses").insert([
    { ...data, submitted_at, email: data.email || null },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    if (error.code === "23505") {
      throw new Error("ALREADY_JOINED");
    }
    throw new Error(error.message);
  }

  // 2. Trigger the Edge Function notification (non-fatal — data is already saved)
  try {
    const { error: fnError } = await supabase.functions.invoke(
      "notify-submission",
      { body: { ...data, submitted_at } }
    );
    if (fnError) console.warn("Edge function error (non-fatal):", fnError);
  } catch (err) {
    console.warn("Edge function call failed (non-fatal):", err);
  }
}

