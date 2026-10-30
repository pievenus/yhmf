-- Not yet run anywhere. Prefer setup_all.sql for a one-paste setup.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  tags text[] not null default '{}',
  status text not null default 'approved'
    check (status in ('pending', 'approved', 'rejected')),
  is_broken boolean not null default false,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search tsvector generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
  ) stored
);

create index links_search_idx on public.links using gin (search);
create index links_tags_idx on public.links using gin (tags);
create index links_category_idx on public.links (category_id);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger links_set_updated_at
  before update on public.links
  for each row execute function public.set_updated_at();
