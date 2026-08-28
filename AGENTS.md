# AGENTS.md - Sensol Fitness Shopify Theme

## Project Overview
- Shopify Dawn 16.0.0 based custom theme for Sensol Fitness (premium pilates reformers)
- Store: 1heajg-6u.myshopify.com
- Live theme: #194288287876 (push with --allow-live)
- Dev theme: #194432761988
- Token env: SHOPIFY_CLI_THEME_TOKEN=shptka_13dcf82ad8062ddda2f7a784dd722a40
- Push command: `SHOPIFY_CLI_THEME_TOKEN=shptka_13dcf82ad8062ddda2f7a784dd722a40 npx @shopify/cli theme push --only <file> --theme <ID> [--allow-live] --store 1heajg-6u.myshopify.com`

## Product Lineup
- **Smart Series** (`/collections/smart-series`): RS02, RS02 PRO, RS03 PRO — digital weight reformers with servo motors, 1kg precision
- **Mechanical Series** (`/collections/mechanical-series`): FLEX, FLEX AIR, FLEX PRO — spring-based foldable reformers
- **Flex Collection** (`/collections/flex-series`): foldable space-saving reformers

## Navigation Architecture
- Main menu items managed in Shopify Admin > Navigation (PHILOSOPHY, PRODUCTS, ENGINEERING, SENZINE)
- PRODUCTS has child links: Smart Series, Mechanical Series (managed in Shopify admin)
- Header section (`sections/sensol-header.liquid`) uses `link.links` to detect child links and renders a **visual mega menu** with collection images
- Collection images come from `child_link.object.image` (Shopify native)
- Fallback: `child_link.object.products.first.featured_image` if no collection image
- Hardcoded descriptions per collection handle via `{% case %}` block
- Mobile: accordion expand with text-only links (no images - avoids inconsistent appearance when some items lack images)

### Design Rule (User Requirement)
> Navigation dropdowns must use collection images, not plain text. This is a sales website, not a blog. Visual richness is mandatory.

## Key Sections
- `sections/sensol-header.liquid` — fixed header with mega menu, logo, cart drawer trigger
- `sections/sensol-footer.liquid` — footer with Products/Company/Support columns
- `sections/sensol-collection-hero.liquid` — collection page hero (settings: eyebrow, title, subtitle)
- `sections/sensol-collection-spotlight.liquid` — unified spotlight section (show_section checkbox)
- `sections/sensol-collection-grid.liquid` — product grid (settings: smart_count, mech_count)
- `sections/sensol-collection-compare.liquid` — model comparison table between the two active products (per collection handle via `{% case %}`)
- `sections/sensol-collection-stats.liquid` — stats with Liquid `{% case collection.handle %}` logic (no schema settings needed)
- `sections/sensol-collection-content.liquid` — bottom content section
- `sections/sensol-home-app.liquid` — homepage App Download teaser (dark #1A1816, phone image + feature blocks + store buttons + compact QRs; correct links: id6747697213 / com.xfq.sensol.vesta)
- `sections/sensol-judge-reviews.liquid` — homepage reviews wrapper (cream #F7F4F0) hosting Judge.me app block; renders app blocks via `{% render block %}`; schema blocks `[{"type": "@app"}]`
- `sections/sensol-app-{hero,tour,features,download}.liquid` — modular /pages/app sections

## Judge.me Integration (Important)
- App block URI format: `shopify://apps/judge-me-reviews/blocks/<name>/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8`
- Valid block names: `review_widget` (product page), `reviews_grid_widget` (homepage grid), `judgeme_core` + `cart_drawer_widget` (app embeds)
- Valid `reviews_grid_widget` settings: show_sample_reviews, review_selection ("all"), display_order ("most_recent"/"media_first"), columns_desktop (1-6), rows_desktop, columns_mobile ("1"/"2" string!), rows_mobile, show_stars, show_reviewer_name, show_average_rating, card_spacing, corner_styling, header_text, max_width
- Valid `review_widget` settings: review_data ("real_data"/"sample_data"), empty_state ("empty_widget"/"other_product_reviews"), show_shop_reviews, max_width
- Discovery method: push probe values to dev theme, then pull back - invalid setting names/blocks get silently DROPPED by Shopify
- Judge.me public API requires auth - store review count is NOT verifiable anonymously
- Widget colors/styling live in Judge.me admin (Settings > Widgets), not the theme

## Liquid Pitfalls (Learned the Hard Way)
- **`push` filter does NOT work with product drops** in Shopify Liquid (`{% assign arr = arr | push: product %}` silently keeps the array empty). Use a counter + direct assignment instead (`{% assign p1 = product %}`).

## Deployment Rules (User Requirement - MANDATORY)
- **Shopify changes take effect IMMEDIATELY. There is NO cache delay - never blame cache.** If a change does not show on the frontend after upload, it did NOT succeed. Debug in this strict order:
  1. Code problem (Liquid logic, template errors)
  2. Wrong upload destination - verify store URL and theme ID match
  3. Confirm it was pushed to the LIVE theme (not just dev)
- **GitHub ↔ Shopify sync is real-time.** The live theme's GitHub connection is the **`shopify` branch** (repo `kowork9527/sensol-fitness-au`) - NOT the `admin` branch. Never confuse them.
- Full deployment = commit locally on `main` → fast-forward `shopify` branch → `git push github shopify` → GitHub integration syncs the live theme instantly.

## Collection Templates
- `templates/collection.json` — default (all products)
- `templates/collection.smart-series.json` — Smart Series (hero + spotlight + grid + compare + stats)
- `templates/collection.mechanical-series.json` — Mechanical Series (same structure as smart-series)
- `templates/collection.flex-series.json` — Flex Collection (no compare section)

## Build & Push
- **Primary flow (GitHub sync)**: work on `main`, then fast-forward `shopify` branch to `main` and push to GitHub remote `github` (kowork9527/sensol-fitness-au). The live theme syncs from the `shopify` branch automatically and instantly.
- **Direct CLI push (live theme)**: `SHOPIFY_CLI_THEME_TOKEN=shptka_13dcf82ad8062ddda2f7a784dd722a40 npx @shopify/cli theme push --only <file> --theme <ID> [--allow-live] --store 1heajg-6u.myshopify.com`
- Git commit after each push
- Working branch: `main`; deployment branch: `shopify` (must always be pushed to GitHub - this is what the live theme reads)
