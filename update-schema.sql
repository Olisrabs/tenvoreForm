-- Create a completely new table for the waitlist responses
create table if not exists waitlist_responses (
  id                uuid primary key default gen_random_uuid(),
  submitted_at      timestamptz not null default now(),

  -- Waitlist info
  name              text,
  phone_number      text,
  state             text,
  email             text
);

-- Add unique constraints to prevent duplicates
ALTER TABLE waitlist_responses ADD CONSTRAINT waitlist_phone_unique UNIQUE (phone_number);

-- Use a unique index for email so we can ignore empty/null emails
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist_responses (email) WHERE email IS NOT NULL AND email <> '';

-- Optional: restrict public inserts only (no reads/updates/deletes from the browser)
alter table waitlist_responses enable row level security;

create policy "Allow anonymous inserts"
  on waitlist_responses
  for insert
  to anon
  with check (true);
