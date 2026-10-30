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
