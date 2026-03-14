create extension if not exists "uuid-ossp";

create table if not exists rsvps (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone_number text not null unique,
  guest_count integer not null check (guest_count >= 1),
  additional_guest_names jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_phone_number_idx on rsvps(phone_number);
create index if not exists rsvps_created_at_idx on rsvps(created_at desc);
