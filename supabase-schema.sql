-- ============================================================
--  MeritUp Waitlist — Supabase Schema
--  Run this in: Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- Drop old table if migrating from Tenvore (only if safe to do so!)
-- DROP TABLE IF EXISTS meritup_waitlist_responses;

CREATE TABLE IF NOT EXISTS meritup_waitlist_responses (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at      timestamptz NOT NULL DEFAULT now(),

  -- Personal info
  name              text,
  phone             text,
  email             text,
  state             text,

  -- Referral system
  my_referral_code  text,          -- unique code generated for this person (MERIT-XXXXX)
  referred_by       text           -- the referral code of the person who invited them
);

-- ── Uniqueness constraints ───────────────────────────────────
ALTER TABLE meritup_waitlist_responses
  ADD CONSTRAINT waitlist_unique_phone UNIQUE (phone);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx
  ON meritup_waitlist_responses (email)
  WHERE email IS NOT NULL AND email <> '';

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_referral_code_idx
  ON meritup_waitlist_responses (my_referral_code)
  WHERE my_referral_code IS NOT NULL;

-- ── Referral leaderboard view ────────────────────────────────
-- Returns each referrer code and how many people they've referred
CREATE OR REPLACE VIEW referral_leaderboard AS
SELECT
  referred_by                          AS referral_code,
  COUNT(*)                             AS referral_count,
  MAX(submitted_at)                    AS last_referral_at
FROM meritup_waitlist_responses
WHERE referred_by IS NOT NULL AND referred_by <> ''
GROUP BY referred_by
ORDER BY referral_count DESC;

-- ── Row-Level Security ───────────────────────────────────────
ALTER TABLE meritup_waitlist_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (browser cannot read or modify data)
CREATE POLICY "Allow anonymous inserts"
  ON meritup_waitlist_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);
