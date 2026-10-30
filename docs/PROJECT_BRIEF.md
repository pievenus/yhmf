# Project brief

## Goal

Build an app that works as a directory of links to many other websites, so a visitor can browse by category, search, and click through to the site.

## Users

- Visitors: browse, search, open links. No login needed.
- Admin (the owner): adds, edits, approves and removes links. Logs in.
- No other contributors. Only the owner adds links.

## In scope (v1)

- Category browsing
- Keyword and tag search
- Link cards that open the target site in a new tab
- Admin page with login for managing links and categories
- Scheduled check that flags dead links

## Out of scope for v1 (unless decided otherwise)

- Native mobile apps (web only, but mobile-friendly layout)
- Public link submissions and approval workflow
- User accounts for visitors
- Comments, ratings, favourites
- Payments

## Constraints

- Frontend must be static (GitHub Pages).
- Backend must be Supabase.
- Low or zero hosting cost.
- The user does not want to repeat context between AI sessions, hence this repo and its logs.

## Communication preference

The user wants plans shown as block diagrams and flowcharts.

## Inspiration

An FMHY-style directory: broad categories, many links, quick to scan.

## Content and hosting risk

- GitHub Pages and Supabase have terms of service that prohibit hosting or facilitating infringing content.
- Directories that link to piracy sites can receive DMCA takedown notices, and accounts can be suspended, which would lose the repo and the database.
- Starter data uses legal free resources (public domain, open access, free-to-use tools).
- Review each added link against this risk before publishing it.
