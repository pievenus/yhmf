# Progress log

Newest first. One entry per work session. Keep it short.

## 2026-10-30 (redesign)
- Site deployed and working. Redesign written (D21), untested. Copy `app/index.html`, `app/src/App.jsx`, `app/src/styles.css`, run locally, then push.

## 2026-10-30 (admin)
- Admin user created in Supabase Auth and added to `admins` table (UID 83e1fbd6-fe38-4898-b160-80fc09b00fe3). Insert succeeded.
- Phase 1 complete.
- Next: run the app locally (`app/`, fill `.env`, `npm install`, `npm run dev`), test admin sign-in and adding a link.

## 2026-10-30 (starter app)
- Supabase SQL ran OK (10 categories, 5 links).
- React starter written in `app/`, deploy workflow added. Untested.
- Next: create admin user, run locally, then deploy.

## 2026-10-30 (SQL)
- SQL fixed for new Supabase grant rules (D19). Use `supabase/setup_all.sql`.
- Next: run it in Supabase, create admin user, insert into `admins`.

## 2026-10-30 (username)
- GitHub user set to pievenus. Live URL: https://pievenus.github.io/yhmf/ (D18).

## 2026-10-30 (final planning)
- Decided: FMHY-style categories, repo `yhmf`, flag broken links, legal-only seed data (D14 to D17).
- Planning phase complete. Next: Phase 1 (Supabase setup).

## 2026-10-30 (later)
- Decided: web only, owner-only editing, React with Vite (plain JS), HashRouter.
- Docs updated to match (D10 to D13).
- Next: answer 3 remaining open questions, then Phase 1 (Supabase setup).

## 2026-10-30
- Planning finished: architecture, plan, decisions, open questions written.
- Repo created with docs, logs and draft Supabase SQL (not yet run anywhere).
- Next: answer `docs/OPEN_QUESTIONS.md`, then Phase 1 (Supabase setup).

## Current status

- Phase: 1 done and verified. Phases 2 to 5 written but untested
- Blocked by: nothing major. Remaining open questions are minor (categories, repo name, broken link handling)
- Last known working thing: nothing built yet

## Errors and fixes

Record any error you hit and how you fixed it, so it is never debugged twice.

| Date | Error | Cause | Fix |
|---|---|---|---|
| | | | |
