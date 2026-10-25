# Med Daddy v9.11.0 — automatic updates and cache control

## User requirement
A student reopening Med Daddy or returning to an open tab should receive new deployed versions without being instructed to hard-refresh, but **must not lose a live quiz/take-up**.

## Architecture
- Add-on module: `md_auto_update_v1.js`.
- Loaded last via the existing compressed `index.html` bootstrap. No change to the historical app payload.
- Each external relative `./*.js` script URL is rewritten at runtime to include `?md_build=<APP_VERSION>`. This invalidates a browser's older JavaScript cache when the app version changes.
- The updater checks deployed `index.html?md_update_probe=<timestamp>` with `fetch(cache:'no-store')`, reading its title version; no separate release manifest required.
- A check runs on opening the site (after 1.6s), on focus/visibility change, on bfcache restore, and every four minutes while visible.
- If the deployed version differs, the browser automatically opens a uniquely tagged current URL with `location.replace`. This is a new navigation, not a destructive local-storage reset.
- If the standard quiz page `#quiz` is visible (including take-up), update is **deferred** until it is no longer visible. It rechecks pending changes after clicks and at 2.5s intervals.
- Network failures are nonfatal. A three-minute `sessionStorage` cooldown avoids a repeated redirect loop if an intermediary still serves old HTML.
- Source verified in a simulated browser: older page updates while idle; quiz isn't interrupted; leaving quiz applies pending update; current version stays put. Asset stamping sample passed.
- GitHub Pages deploy of main v9.11.0 succeeded, followed by a small UI version-label patch. Original v9.10.9 index backed up as `v9.10.9_rollback_index.html`.

## Release discipline (important)
**Every future app release must change the three version strings in the index bootstrap:**
1. `<title>Med Daddy vX.Y.Z — …</title>`
2. Initial "Loading Med Daddy vX.Y.Z…" message
3. `.replace('const APP_VERSION="9.8.0";','const APP_VERSION="X.Y.Z";')`

The bootstrap automatically reads the resulting APP_VERSION and applies it to all script URLs. The updater reads the deployed title to detect changes. Changing a JS file without bumping the index version is **not** enough to trigger auto-refresh. Do not alter the source check SHA of the packaged payload.

## Limits
- First installation: users already holding a pre-v9.11.0 cached tab cannot gain updater logic until that old page is reloaded or naturally revalidated. Subsequent releases are automatic.
- The application has no dedicated service worker; none was introduced.
- No guarantee of instant propagation while GitHub Pages deploys or caches are still catching up; checking retries on subsequent intervals/focus.
- Live mobile browser/manual end-to-end test still recommended.
- Quiz question banks, source citations, mocks, stored progress and other units untouched.
