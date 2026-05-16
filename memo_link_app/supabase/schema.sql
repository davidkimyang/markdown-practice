create table if not exists public.notes (
  id uuid primary key,
  content text not null check (char_length(content) <= 10000),
  short_id varchar(12) unique not null,
  created_at timestamp with time zone default now() not null,
  expires_at timestamp with time zone
);

create index if not exists notes_short_id_idx on public.notes(short_id);

alter table public.notes enable row level security;

create policy "Allow public insert" on public.notes
for insert
with check (true);

create policy "Allow public read" on public.notes
for select
using (true);
