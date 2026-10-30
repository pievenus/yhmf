# Website Directory (yhmf)

A directory app that lists links to many other websites, organised by category and searchable.

- Frontend: static site hosted on GitHub Pages
- Backend: Supabase (Postgres, auto REST API, Auth, Row Level Security, Edge Functions)

Status: planning complete, no app code written yet. See `logs/PROGRESS.md` for the current state.

## Start here (humans and AI assistants)

1. Read `AGENTS.md` first. It is the short context file to give any AI assistant.
2. Read `docs/PROJECT_BRIEF.md` for goals and constraints.
3. Read `docs/DECISIONS.md` for what is already decided, so it is not re-debated.
4. Read `docs/OPEN_QUESTIONS.md` for what is still undecided.
5. Check `logs/PROGRESS.md` for the next step.

## Run locally

```
cd app
cp .env.example .env     # fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev
```

## Deploy

1. Push to `pievenus/yhmf` on branch `main`.
2. GitHub repo, Settings, Pages: set Source to GitHub Actions.
3. GitHub repo, Settings, Secrets and variables, Actions, Variables tab: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (public values).
4. Push again or run the workflow. Site: https://pievenus.github.io/yhmf/

## Repo map

| Path | Purpose |
|---|---|
| `AGENTS.md` | Context file to paste or point any AI at |
| `docs/PROJECT_BRIEF.md` | Goal, users, scope, constraints |
| `docs/ARCHITECTURE.md` | Block diagrams and flowcharts (Mermaid, rendered by GitHub) |
| `docs/PLAN.md` | Phased build plan with checkboxes |
| `docs/DECISIONS.md` | Decision log (what and why) |
| `docs/OPEN_QUESTIONS.md` | Unresolved choices |
| `docs/SECURITY.md` | Key handling and RLS rules |
| `logs/AI_LOG.md` | Log of AI conversations and what came out of them |
| `logs/PROGRESS.md` | Running dev log, newest first |
| `logs/CHANGELOG.md` | Notable changes to the repo |
| `app/` | React and Vite frontend |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages |
| `supabase/` | Draft SQL schema, policies and seed data |
| `.env.example` | Names of environment variables, no secrets |

## How to keep this repo useful

- After every AI session, add an entry to `logs/AI_LOG.md` (template inside).
- After every work session, add a line to `logs/PROGRESS.md`.
- When you decide something, add it to `docs/DECISIONS.md` and remove it from `docs/OPEN_QUESTIONS.md`.
- Start every new AI chat with: "Read AGENTS.md and the files it links to, then continue."
