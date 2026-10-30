# AGENTS.md: context for any AI assistant

Read this first. Do not ask the user to repeat anything that is written in this repo.

## Project in one paragraph

A website directory app: a searchable, categorised list of links to other websites. The frontend is static and hosted on GitHub Pages. The backend is Supabase. The user wants plans communicated with block diagrams and flowcharts.

## Fixed decisions (do not re-ask)

- Frontend hosting: GitHub Pages (static files only, no server code).
- Backend: Supabase (Postgres, auto REST API, Auth, RLS, Edge Functions, cron).
- No custom backend server. The frontend talks to Supabase directly through `supabase-js`.
- Security comes from Row Level Security. The public `anon` key may be in frontend code. The `service_role` key must never be.
- Search runs client-side for now (D20); a Postgres `search` column exists for later. No separate search service.
- Plans and explanations should use block diagrams and flowcharts where useful.
- Web only. No native mobile apps.
- Only the owner adds links. No public submissions, no approval workflow.
- Category style: FMHY-style broad categories plus tags.
- GitHub user: `pievenus`. Repo: `pievenus/yhmf`. Live URL: `https://pievenus.github.io/yhmf/`. Vite `base` is `/yhmf/`.
- Broken links are flagged (`is_broken`), never hidden or auto-deleted.
- Seed data uses legal sources only; see content risk in `docs/PROJECT_BRIEF.md`.
- Frontend stack: React with Vite, plain JavaScript, HashRouter, `@supabase/supabase-js`.

## Still open (ask only about these)

See `docs/OPEN_QUESTIONS.md`. Main ones: final category list and exact content policy.

## Where things are

- Goals: `docs/PROJECT_BRIEF.md`
- Diagrams: `docs/ARCHITECTURE.md`
- Plan and checkboxes: `docs/PLAN.md`
- Decisions: `docs/DECISIONS.md`
- Progress: `logs/PROGRESS.md`
- Past AI sessions: `logs/AI_LOG.md`
- Draft SQL: `supabase/`

## Rules for assistants working in this repo

1. Check `logs/PROGRESS.md` and `docs/PLAN.md` to find the next step before suggesting anything.
2. Never put secrets in the repo. Only `.env.example` with variable names.
3. When something is decided, update `docs/DECISIONS.md` and `docs/OPEN_QUESTIONS.md`.
4. At the end of a session, append an entry to `logs/AI_LOG.md` and `logs/PROGRESS.md`.
5. GitHub Pages quirks to remember: no server-side routing (use hash routes or a 404 redirect) and the base path must match the repo name if the site is served from a subpath.
6. New Supabase public tables need explicit GRANTs (D19). Always include them with any new table.
7. Verify current Supabase free-tier limits and behaviour before making claims about them.
