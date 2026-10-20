# Med Daddy v9.9.1 — privacy-first analytics integration (staged)

## Activated Oct 20 2026 — website tracking enabled (subject to privacy controls)

The website owner has now supplied their public Umami Cloud website ID and activated tracking in `md_analytics_config.js`. Browser privacy signals and visitor opt-out still suppress it. Dashboard receipt of actual events needs a live-site visit and account-owner confirmation; historical counts cannot be recovered.

### One-time owner setup
1. Create or sign in to a free *Hobby* Umami Cloud account: https://cloud.umami.is
2. Choose **Websites → Add website**. Name: `Med Daddy`; Domain: `meddaddy.github.io` (host only, not the `/meddaddystudyapp/` path).
3. Open **Tracking Code** for that website and copy **data-website-id**, a public UUID such as `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. No account password or API key should be shared.
4. COMPLETE: The approved public website ID is configured in `md_analytics_config.js` and deployed. The page should report pageviews and supported `unit_open` events where users permit tracking.
5. Visit https://meddaddy.github.io/meddaddystudyapp/ and test under Umami's dashboard. Don't expect perfect totals: blockers, privacy choices and unavailable networks exclude some visits.

## What is recorded, only after activation
- Pageviews to the Med Daddy app, with URL search queries and fragments excluded.
- A predefined `unit_open` event with a fixed allow-listed label for PCT II and A&P II units and guides (no details of what was answered).
- Aggregated visitor and browser information processed by Umami Cloud. Umami itself handles anonymous sessions and processes visitor IP for counting without storing raw IP (verify with provider policies); analytics are not the same as an individually identifiable headcount.

## What this code never submits
- Student names, accounts, email, phone, direct personal identifiers, custom visitor ID, query or hash from pageview URLs, grades, marks, quiz responses, question content or IDs, scores, clickstreams inside a quiz, locally saved progress, medical history.

## Privacy controls
- Do Not Track (where available) and Global Privacy Control suppress loading.
- A visitor can select `Privacy · Anonymous usage analytics → Do not count my visits or unit openings` on the home screen; only that preference is stored locally.
- Umami's before-send hook blocks all sending after opt out (no cookie or personal ID is added by this app).
- Tracker only runs at `https://meddaddy.github.io/meddaddystudyapp/`, never on a localhost test or copied HTML file.
- Analytics errors are isolated, nonblocking, and the site remains fully usable offline.

## Scope and honesty
This does not track other standalone study pages (e.g. `/urinary_plain_english.html`) yet. The app itself is a single page, so 'popular study units' comes from explicit `unit_open` events, not 'top pages' alone. It does not count unique *students* with certainty, since individual people can use several devices and sessions; all statistics are estimates. No historical analytics can be backfilled.

## Release mechanics
- Add `md_analytics_config.js` (blank website ID; safe off state)
- Add `md_v991_analytics.js` (fails closed; unit navigation instrumentation and local preference UI)
- Append both after all app overlays in the unpacked-app loader; update version to 9.9.1
- Preserve v9.9.0 index in `v9.9.0_rollback_index.html`
- No question bank, treatment directive, study progress key or student score key is changed.

## Activation audit — Oct 20, 2026
- Config-only change from a blank website ID to the website owner's supplied UUID, without changing quiz banks, stored answers, or the app entrypoint.
- Umami's own browser tracking and privacy controls apply; ad blockers, Do Not Track, Global Privacy Control and per-visitor opt-outs may reduce counts.
- A successful GitHub Pages workflow confirms deployment, NOT receipt of analytics events in the private Umami dashboard. Owner should validate using a permitted test browser.
