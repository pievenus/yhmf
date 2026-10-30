# AI log

Purpose: record what was asked, what the AI produced, and what was decided, so no session has to start from zero.

Newest entries at the top. Use the template at the bottom for new entries.

---

## Session 8: 2026-10-30: Modern visuals (Claude)

- App deployed and working on GitHub Pages. User asked for modern visuals.
- Claude redesigned the UI: new tokens, fonts, hero search, favicons, hover states. Changed `app/index.html`, `app/src/App.jsx`, `app/src/styles.css`; added `docs/DESIGN.md`; D21.
- Not tested: sandbox had no network.
- Next: user copies the changed files, runs locally, commits and pushes. Then Phase 6 (dead link checker).

---

## Session 7: 2026-10-30: Admin user (Claude)

- User shared the admin user UID; Claude gave the `admins` insert; it succeeded. Next: run the app locally and report any errors.

---

## Session 6: 2026-10-30: React starter (Claude)

- User ran `setup_all.sql` in Supabase: success, 10 categories and 5 links confirmed.
- Claude wrote the React and Vite app in `app/` (directory, category and search, admin login, add, edit, delete, clear broken flag), `.github/workflows/deploy.yml`, and README run and deploy steps. D20: search is client-side.
- Not tested: the sandbox had no network, so `npm install` and `npm run dev` were not run.
- Next: user creates admin user and inserts into `admins`, runs the app locally, reports errors.

---

## Session 5: 2026-10-30: Supabase SQL setup (Claude)

- User asked for the SQL step. Claude checked current Supabase behaviour and found that new public tables are no longer exposed to the Data API without explicit GRANTs (enforcement for existing projects: 2026-10-30).
- Fixed the draft SQL: added `supabase/grants.sql`, an `updated_at` trigger, and a one-paste `supabase/setup_all.sql`. Recorded as D19.
- Next: user runs setup_all.sql, creates admin user, inserts into `admins`.

---

## Session 4: 2026-10-30: GitHub username (Claude)

- User replied "pievenus", interpreted as the GitHub username. Recorded as D18 and filled into URLs.
- Left open: final category list, exact content policy.
- Next step: Phase 1 (Supabase setup).

---

## Session 3: 2026-10-30: Final planning answers (Claude)

### Conversation summary

1. User answered the last questions: categories like FMHY, repo name `yhmf`, flag broken links.
2. Claude noted a hosting risk: FMHY-style directories often include piracy sites, and GitHub Pages and Supabase terms prohibit infringing content. Claude recorded the risk and used legal-only starter data. The owner decides what to list later.
3. Claude updated decisions, brief, plan, seed data, AGENTS.md and logs.

### Decisions made

D14 to D17 in `docs/DECISIONS.md`.

### Left open

Final category list, GitHub username, exact content policy.

### Next step

Phase 1: create the Supabase project and run the SQL.

---

## Session 2: 2026-10-30: Decisions and stack (Claude)

### Conversation summary

1. Claude created this repo (docs, logs, draft SQL) from Session 1.
2. User answered the open questions: web only, only the owner adds links, and asked Claude to recommend the frontend stack.
3. Claude recommended React with Vite, plain JavaScript, with HashRouter for GitHub Pages.
4. Claude updated decisions, plan, open questions and AGENTS.md accordingly.

### Decisions made

D10 to D13 in `docs/DECISIONS.md`.

### Left open

Categories to cover, repo name or custom domain, hide vs flag broken links.

### Next step

Answer the remaining open questions, then start Phase 1 (Supabase setup).

---

## Session 1: 2026-10-30: Planning (Claude)

### Conversation summary

1. User asked for a plan for an app that works as a directory to various other websites, using block diagrams and flowcharts.
2. Claude produced a three-tier block diagram (frontend, backend, data and jobs) and a visitor-journey flowchart, plus a seven-step build order. Claude asked whether the app is web or mobile, and whether others can submit links.
3. User said the frontend will be on GitHub Pages and the backend on Supabase.
4. Claude revised the architecture: removed the custom Links API, replaced the search index with Postgres full-text search, added RLS and Supabase Auth for admin writes, and an Edge Function plus cron for dead-link checks. Claude drew an updated block diagram and a deploy flowchart.
5. Claude listed GitHub Pages caveats: no server-side routing, base path for subpath hosting, and a reminder to check Supabase free-tier limits.
6. User asked for this repo containing all info and logs so they do not have to repeat anything again.

### Outputs

- Block diagram v1 (superseded) and v2 (current), visitor flowchart, deploy flowchart. All now in `docs/ARCHITECTURE.md`.
- Revised build order. Now in `docs/PLAN.md`.
- Draft SQL schema and RLS policies in `supabase/`.

### Decisions made

D1 to D9 in `docs/DECISIONS.md`.

### Left open

Everything in `docs/OPEN_QUESTIONS.md`.

### Limits of this log

This log was written from the conversation as it happened in this chat. Earlier chats with other tools or assistants are not included. If there are any, paste their key points into a new entry below.

### Next step

Answer the open questions, then start Phase 1 in `docs/PLAN.md`.

---

## Template for new entries

```
## Session N: YYYY-MM-DD: Topic (tool or model used)

### Prompt or request
### What the AI produced
### Decisions made (link to DECISIONS.md IDs)
### Problems or errors hit
### Next step
```
