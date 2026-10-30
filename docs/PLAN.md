# Build plan

Tick boxes as work completes and note it in `logs/PROGRESS.md`.

## Phase 0: planning
- [x] Define goal and scope
- [x] Choose hosting: GitHub Pages and Supabase
- [x] Draw block diagrams and flowcharts
- [x] Create this repo with docs and logs
- [x] Decide platform, contributors and stack (web only, owner only, React with Vite)
- [x] Choose categories style, repo name and broken-link handling
- [ ] Confirm final category list and content policy (`docs/OPEN_QUESTIONS.md`)

## Phase 1: Supabase setup
- [ ] Create Supabase project
- [ ] Paste and run `supabase/setup_all.sql` in the SQL Editor (schema, RLS, grants, seed)
- [x] Create admin user in Supabase Auth and insert into `admins`
- [ ] Load `supabase/seed.sql` (20 to 30 real sites)

## Phase 2: Frontend skeleton
- [x] Choose stack: React with Vite, plain JavaScript
- [x] Create frontend project (`npm create vite@latest`, React template) and install `@supabase/supabase-js` and `react-router-dom`
- [x] Configure env vars (URL and anon key only)
- [x] Category list and link cards reading from Supabase
- [x] Hash-based routing (HashRouter) for GitHub Pages

## Phase 3: Search
- [x] Keyword search (client-side, see D20)
- [x] Tag filtering
- [x] Empty state and loading state

## Phase 4: Admin
- [x] Login page (Supabase Auth)
- [x] Add, edit, delete links (categories are edited in Supabase for now)
- [x] Approve or reject submissions: not needed (owner-only, D11)

## Phase 5: Deploy
- [x] GitHub Actions workflow to build and publish to Pages
- [x] Set Vite `base: '/yhmf/'`
- [ ] Add Supabase env values as repo secrets or build variables (anon key only)

## Phase 6: Dead link checker
- [ ] Edge function that checks URLs
- [ ] Cron schedule
- [ ] Show a "may be down" badge on flagged links (do not hide)
- [ ] Admin filter listing all flagged links

## Phase 7: Polish
- [x] Mobile layout (chips instead of sidebar)
- [x] Favicons per site
- [ ] SEO basics and page titles
- [ ] Check Supabase free-tier limits before launch

## Written but not yet tested

Phase 2 to 5 code exists in `app/` but has not been run. Test locally, then deploy.

## Design

Modern redesign written (D21, `docs/DESIGN.md`). Not yet tested in a browser.
