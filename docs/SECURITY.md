# Security notes

## Keys

- `SUPABASE_URL` and `SUPABASE_ANON_KEY` are meant to be public and can be in frontend code.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Never put it in the frontend, never commit it. Use it only inside Edge Functions via Supabase secrets.
- Only `.env.example` (names, no values) is committed.

## Row Level Security

- RLS must be enabled on every table in the public schema.
- Visitors: select on approved links and on categories.
- Admin: full access, determined by membership in the `admins` table through the `is_admin()` function.
- The `admins` table has RLS enabled with no policies, so only the `is_admin()` function can read it.

## Grants

- New public tables need explicit GRANTs before the API can see them (see D19). `supabase/grants.sql` does this.
- GRANT does not replace RLS. Never grant to `anon` on a table without RLS enabled.
- `admins` has no grants for `anon` or `authenticated`.

## Checks before launch

- [ ] Security Advisor in the Supabase dashboard shows no warnings for these tables

- [ ] RLS enabled on all tables
- [ ] Tried writing to `links` while logged out and confirmed it fails
- [ ] No service_role key anywhere in the repo history
- [ ] Admin account uses a strong password
