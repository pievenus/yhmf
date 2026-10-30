# Decision log

Format: ID, date, decision, reason. Newest at the bottom.

## D1 (2026-10-30): Build a directory-of-websites app
Reason: the user's stated goal.

## D2 (2026-10-30): Use block diagrams and flowcharts for planning
Reason: the user's stated preference.

## D3 (2026-10-30): Frontend on GitHub Pages
Reason: user's choice. Consequence: static files only, no server code, no server-side routing.

## D4 (2026-10-30): Backend on Supabase
Reason: user's choice. Consequence: the frontend calls Supabase directly through `supabase-js`.

## D5 (2026-10-30): Remove the custom "Links API" block
Reason: Supabase auto-generates a REST API from the tables. A separate API server would be extra work with no benefit here.

## D6 (2026-10-30): Use Postgres full-text search instead of a separate search index
Reason: simpler and enough for a directory of this size. Revisit if the list grows very large.

## D7 (2026-10-30): Security via Row Level Security
Reason: with a static frontend the anon key is public by design. RLS limits visitors to reading approved links and limits writes to the admin. The service_role key is never used in the frontend.

## D8 (2026-10-30): Dead link checker runs as an Edge Function on a cron schedule
Reason: it needs server-side code, which GitHub Pages cannot provide. Scheduled for a later phase.

## D9 (2026-10-30): Keep a repo of docs and logs to avoid repeating context
Reason: the user does not want to restate the project in every AI session. `AGENTS.md` is the entry point.

## D10 (2026-10-30): Web only
Reason: user's choice. Layout should still be mobile-friendly, but no native apps.

## D11 (2026-10-30): Only the owner adds links
Reason: user's choice. Consequence: no public submission form and no approval workflow. The `status` column stays in the schema for flexibility but is not used in the UI for v1.

## D12 (2026-10-30): React with Vite, plain JavaScript (no TypeScript)
Reason: recommended by Claude. Vite builds a static site that GitHub Pages can serve, React keeps the admin forms and multiple screens manageable, and plain JavaScript keeps the learning curve low. TypeScript can be added later.

## D13 (2026-10-30): Hash-based routing (HashRouter)
Reason: GitHub Pages has no server-side routing, so normal routes would 404 on refresh.

## D14 (2026-10-30): FMHY-style categories
Reason: user's choice. Broad top-level categories (video, music, games, books, learning, software, AI, developer, and so on) with tags for finer filtering. Starter list is in `supabase/seed.sql`.

## D15 (2026-10-30): Repo name is `yhmf`
Consequence: site URL will be `https://pievenus.github.io/yhmf/`. Vite config needs `base: '/yhmf/'`.

## D16 (2026-10-30): Flag broken links, do not hide them
Consequence: the checker sets `is_broken = true`. Public UI shows a small "may be down" badge. The admin page has a filter listing all flagged links for review. Nothing is removed automatically.

## D17 (2026-10-30): Seed data uses legal sources only; content risk recorded
Reason: GitHub Pages and Supabase both have terms against infringing content, and a repo that links to piracy sites can attract DMCA notices or suspension. Starter data therefore uses legal free resources. What the owner lists later is the owner's decision, and the risk is documented in the brief.

## D18 (2026-10-30): GitHub username is pievenus
Consequence: repo is `pievenus/yhmf` and the live site will be `https://pievenus.github.io/yhmf/`.

## D19 (2026-10-30): Explicit GRANTs are part of the SQL setup
Reason: Supabase no longer exposes new public-schema tables to the Data API automatically; enforcement reaches existing projects on 2026-10-30. Without grants the app gets "permission denied". Added `supabase/grants.sql` and a combined `supabase/setup_all.sql`. GRANT controls whether the API can see a table; RLS still controls which rows each role can access. Both are needed. Also granted execute on `is_admin()` because policies call it.

## D20 (2026-10-30): Search and filtering happen in the browser for now
Reason: for a directory of up to a few hundred links, loading all links once gives instant search with partial-word matching and fewer requests. The database `search` column and GIN index are still there. Switch to `.textSearch('search', ...)` if the list grows past roughly a thousand links (Supabase returns 1000 rows per request by default).

## D21 (2026-10-30): Visual redesign
Reason: user asked for modern visuals. Teal accent, Bricolage Grotesque and Instrument Sans fonts, per-site favicons with letter fallback, hero search with `/` shortcut, dark mode following the system. Details in `docs/DESIGN.md`. Favicons come from Google's favicon service, which is a privacy tradeoff for visitors.
