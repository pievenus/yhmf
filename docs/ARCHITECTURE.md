# Architecture

Site URL: `https://pievenus.github.io/yhmf/`

GitHub renders the Mermaid diagrams below directly.

## 1. Block diagram: system

```mermaid
flowchart LR
  subgraph GH["GitHub Pages (static frontend)"]
    A1["Home and categories"]
    A2["Search and link cards"]
    A3["Admin page (login)"]
    A4["supabase-js client"]
    A1 --> A4
    A2 --> A4
    A3 --> A4
  end
  subgraph SB["Supabase (backend)"]
    B1["Postgres database"]
    B2["Auto REST API"]
    B3["Auth and RLS rules"]
    B4["Edge function and cron"]
    B2 --> B1
    B3 --> B2
    B4 --> B1
  end
  A4 <--> B3
```

Notes:
- Frontend is a React and Vite app built to static files (D12).
- There is no custom API server. Supabase exposes tables through its built-in REST API.
- RLS decides access: public can read approved links, only the admin can write.
- The edge function plus cron job checks URLs and flags dead links.

## 2. Flowchart: visitor journey

```mermaid
flowchart TD
  S["Open app"] --> D{"Browse or search?"}
  D -->|Browse| C["Pick a category"]
  D -->|Search| K["Type a keyword"]
  C --> R["See results list"]
  K --> R
  R --> O["Open site in new tab"]
```

## 3. Flowchart: deploy and runtime

```mermaid
flowchart TD
  E["Edit code locally"] --> P["Push to GitHub"]
  P --> G["GitHub Actions builds site"]
  G --> L["Live on GitHub Pages"]
  L --> F["Fetches data from Supabase"]
```

## 4. Flowchart: admin adds a link

```mermaid
flowchart TD
  A["Admin opens admin page"] --> L{"Logged in?"}
  L -->|No| LG["Sign in with Supabase Auth"]
  LG --> L
  L -->|Yes| F["Fill link form"]
  F --> W["supabase-js insert"]
  W --> R{"RLS: is admin?"}
  R -->|No| X["Rejected"]
  R -->|Yes| OK["Saved, visible to visitors"]
```

## 5. Flowchart: dead link checker (later phase)

```mermaid
flowchart TD
  T["Cron schedule fires"] --> EF["Edge function runs"]
  EF --> Q["Read links from database"]
  Q --> H["Request each URL"]
  H --> OKQ{"Responds OK?"}
  OKQ -->|Yes| U1["Update last_checked_at"]
  OKQ -->|No| U2["Set is_broken = true"]
```

## Earlier version (superseded)

The first draft had a separate Links API and a separate search index in the backend. Both were removed once GitHub Pages and Supabase were chosen. See `docs/DECISIONS.md`.
