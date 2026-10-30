-- yhmf: full setup in one paste. Order: schema, RLS and policies, grants, seed.
-- Do not add the admin row here; do it after creating your admin user (see seed.sql bottom).

-- ===== schema =====
-- DRAFT: not yet run anywhere. Review before using.

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

-- ===== RLS and policies =====
-- DRAFT: run after schema.sql.

alter table public.categories enable row level security;
alter table public.links enable row level security;
alter table public.admins enable row level security;
-- admins has RLS on and no policies: only is_admin() below can read it.

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Categories: everyone reads, admin writes
create policy "categories public read" on public.categories
  for select using (true);
create policy "categories admin insert" on public.categories
  for insert with check (public.is_admin());
create policy "categories admin update" on public.categories
  for update using (public.is_admin()) with check (public.is_admin());
create policy "categories admin delete" on public.categories
  for delete using (public.is_admin());

-- Links: everyone reads approved, admin reads and writes all
create policy "links public read approved" on public.links
  for select using (status = 'approved' or public.is_admin());
create policy "links admin insert" on public.links
  for insert with check (public.is_admin());
create policy "links admin update" on public.links
  for update using (public.is_admin()) with check (public.is_admin());
create policy "links admin delete" on public.links
  for delete using (public.is_admin());

-- ===== grants =====
-- Run after schema.sql and policies.sql.
-- Supabase no longer exposes new public tables to the Data API automatically,
-- so each table needs explicit grants. RLS (policies.sql) still limits which rows each role can touch.

grant select on table public.categories to anon;
grant select on table public.links to anon;

grant select, insert, update, delete on table public.categories to authenticated;
grant select, insert, update, delete on table public.links to authenticated;

-- admins: no grants for anon or authenticated. Only the is_admin() function reads it.

-- Policies call is_admin(), so API roles need permission to run it.
grant execute on function public.is_admin() to anon, authenticated;

-- ===== seed =====
-- DRAFT sample data. Edit categories freely. Starter links are legal free resources only.

insert into public.categories (name, slug, description) values
  ('Video and streaming', 'video-streaming', 'Free and legal video, films and shows'),
  ('Music and audio', 'music-audio', 'Free music, podcasts and audio tools'),
  ('Games', 'games', 'Free games and game resources'),
  ('Books and reading', 'books-reading', 'Public domain and open access books'),
  ('Learning and education', 'learning', 'Free courses and study resources'),
  ('Software and tools', 'software-tools', 'Free and open source software'),
  ('AI tools', 'ai-tools', 'AI assistants and related tools'),
  ('Developer resources', 'developer', 'Docs, code hosting and learning for developers'),
  ('Images and design', 'images-design', 'Free images, icons and design tools'),
  ('Miscellaneous', 'misc', 'Everything else');

insert into public.links (title, url, description, category_id, tags)
select 'Internet Archive', 'https://archive.org', 'Free books, films, music and web archive', c.id, array['archive','books','video','audio']
from public.categories c where c.slug = 'misc';

insert into public.links (title, url, description, category_id, tags)
select 'Project Gutenberg', 'https://www.gutenberg.org', 'Public domain ebooks', c.id, array['ebooks','public-domain']
from public.categories c where c.slug = 'books-reading';

insert into public.links (title, url, description, category_id, tags)
select 'Khan Academy', 'https://www.khanacademy.org', 'Free lessons across many subjects', c.id, array['courses','free']
from public.categories c where c.slug = 'learning';

insert into public.links (title, url, description, category_id, tags)
select 'MDN Web Docs', 'https://developer.mozilla.org', 'Web development documentation', c.id, array['web','docs']
from public.categories c where c.slug = 'developer';

insert into public.links (title, url, description, category_id, tags)
select 'Wikimedia Commons', 'https://commons.wikimedia.org', 'Freely usable images and media', c.id, array['images','free']
from public.categories c where c.slug = 'images-design';

-- After creating your admin user in Supabase Auth, run:
-- insert into public.admins (user_id) values ('PASTE-USER-UUID-HERE');
