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

## Liquid Pitfalls (Learned the Hard Way)
- **`push` filter does NOT work with product drops** in Shopify Liquid (`{% assign arr = arr | push: product %}` silently keeps the array empty). Use a counter + direct assignment instead (`{% assign p1 = product %}`).
- **Shopify page cache**: full-page HTML is cached per URL variant. Random query params (`?_cb=123`) do NOT vary the cache key; `?sort_by=<value>` DOES. To verify a fresh render after pushing, use a new `sort_by` value or wait for cache TTL.
- Section Rendering API (`?sections=template--ID__key`) responses are also cached server-side.

## Collection Templates
- `templates/collection.json` — default (all products)
- `templates/collection.smart-series.json` — Smart Series (hero + spotlight + grid + compare + stats)
- `templates/collection.mechanical-series.json` — Mechanical Series (same structure as smart-series)
- `templates/collection.flex-series.json` — Flex Collection (no compare section)

## Build & Push
- All changes pushed via Shopify CLI to both live and dev themes
- Git commit after each push
- Current branch: main
