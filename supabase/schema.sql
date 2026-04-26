create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references auth.users(id) on delete set null,
  short_id text not null unique,
  content text not null,
  is_private boolean not null default false,
  view_count integer not null default 0,
  expires_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists idx_notes_short_id on public.notes(short_id);
create index if not exists idx_notes_user_created_at on public.notes(user_id, created_at desc);

create or replace function public.increment_note_views(p_short_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.notes
  set view_count = view_count + 1
  where short_id = p_short_id;
end;
$$;

alter table public.notes enable row level security;
alter table public.profiles enable row level security;

create policy "Public notes are readable"
on public.notes for select
using (
  (is_private = false and (expires_at is null or expires_at > now()))
  or auth.uid() = user_id
);

create policy "Users can insert own notes"
on public.notes for insert
with check (
  user_id is null or auth.uid() = user_id
);

create policy "Users can update own notes"
on public.notes for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own notes"
on public.notes for delete
using (auth.uid() = user_id);

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can upsert own profile"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);
