# Design notes

Goal: modern, fast to scan. The big search box is the main feature; everything else stays quiet.

## Tokens

- Light: bg `#f4f5f9`, panel `#fff`, text `#11131a`, muted `#626a7c`, line `#e1e4ec`, accent (marine teal) `#0b7a75`, accent tint `#e2f3f1`
- Dark (follows system): bg `#0b0c11`, panel `#13151c`, text `#eceef5`, accent `#4fd1c5`
- Warning (broken links): amber badge

## Type

- Headings and brand: Bricolage Grotesque (Google Fonts)
- Body: Instrument Sans (Google Fonts)
- Both have system-font fallbacks.

## Layout

- Sticky category sidebar on desktop, scrolling chips on mobile.
- Hero with category title and a large search box. Press `/` to focus it.
- Links in a two-column grid on wide screens. Each row shows the site's favicon (letter tile if it fails), title, domain, two-line description, tags.
- Hover: border turns accent and a small arrow icon appears.

## Privacy note

Favicons load from Google's favicon service (`google.com/s2/favicons`), so visitors' browsers send the listed domains to Google. To avoid that, remove the `<img>` in `Fav` in `app/src/App.jsx` and keep only the letter tile.
