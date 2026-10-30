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
