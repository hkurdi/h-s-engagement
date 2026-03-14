create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null unique,
  guest_count integer not null check (guest_count >= 1),
  additional_guest_names text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
