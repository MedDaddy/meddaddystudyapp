# Med Daddy — Current release and source-deck inventory
Updated: 2026-10-27
**Current repository version:** v9.11.10
**Repository:** MedDaddy/meddaddystudyapp (main)
**Unit:** PCT II Infectious & Communicable Diseases

## v9.11.10 — Infectious PCP directives exam deck
- Added **50 new instructor-style four-choice questions** to the existing PCT II Infectious Diseases UI under **"Infectious — PCP Directives & BLS Standards · 50"**, not as a separate mini app or short quiz tile.
- Sources individually referenced: Ontario BLS PCS v3.4 (Fever, Dysphagia, Bite Injury, Oxygen Therapy) and ALS PCS v5.4 (PCP Croup, Bronchoconstriction, Auxiliary IV and Fluid Therapy). 50 items across seven clinically relevant strands (8 Fever, 6 Dysphagia, 11 Croup, 10 Bronchoconstriction, 6 IV, 5 Bite, 4 Oxygen). Includes dose/threshold/indication/contraindication and correct-combination questions.
- Files: `md_v91110_infectious_directives_a.js` (25), `md_v91110_infectious_directives_b.js` (25), integration update `md_v9117_infectious_unit_rebuild.js`; index patched to load all dependencies before UI.
- Every question has a distinct key and distractor rationale; structural audit found 50 unique IDs/stems, four distinct options, keys distributed 13/13/12/12, and no incomplete rationale fields.
- Exam launch uses fixed **50-question full deck** and explicitly disables the shared adaptive/missed-only and recycle filters for this source-selected examination; previously stored learning history and progress remain unchanged.
- Executable JavaScript simulation with the safety registry verified registration and launch of all 50 directive items and revalidated the preserved 130-question original mock. Syntax and GitHub loader order verified. The simulation does **not** constitute an independently observed live browser test.
- No other unit bank modified; no automatic mid-session updater.

## v9.11.9 preserved mock launch repair
- Root cause: core Med Daddy start() safety wrappers discard **unregistered** question IDs. The uploaded Infectious original mock and nine new Chapter 39 textbook questions were present in source decks but absent from window.MD_SAFE_QUESTIONS, so launching the mock filtered all 130 to an empty pool and falsely showed a "No missed or unseen" alert.
- Fix: the source-deck module now registers new mock/textbook questions with the existing safety Map, preserving identity, original mock order and answer key. Structural/answer-leak checks and ID collision guards remain active; no stored progress keys are reset and no safety wrapper is disabled.
- Verified via executable JavaScript launcher simulation: all 130 mock questions registered, all nine textbook questions registered, selecting preserved mock launches all 130 original IDs in order. Also verified index title and single embedded release version both v9.11.9. Live GitHub Pages rendering not yet verified.

## v9.11.8 critical version consistency fix
- Root cause: the outer loader presented v9.11.8, but on every load it explicitly rewrote the embedded application's APP_VERSION to **v9.11.3**. This made the home screen display v9.11.3 even though the repo was newer; it was **not evidence of an active updater**, which had already been disconnected.
- Fixed in `index.html`: `mdReleaseVersion='9.11.8'` now supplies the embedded `APP_VERSION`, the outer page title/loading label, and appended script cache query. Never reintroduce literal stale APP_VERSION numbers in the embedded loader.
- `md_auto_update_v1.js` remains excluded from the startup script chain; user progress and banks are unchanged by this label fix.

## Student-facing interface
- Single normal unit exam launcher, same shared study-mode engine.
- Source selector: Full Infectious Bank, original preserved mock, 6-page instructor guide, 2-page additional exam review, Chapter 39 lecture, Nancy Caroline Chapter 39 topic/case review, High-Yield.
- Generated sessions: 50, 75, 100 or full deck. Original mock runs in original order with all 130 items.
- Obsolete 10-question concept quiz grid and source-audit developer panels are removed from Infectious Diseases.
- Existing PCP Directive Study Centre accessible from the unit screen.
- Auto-refresh/auto-updater remains disabled. Do not re-enable mid-session reload.

## Source provenance / validation
- **Original 130-question mock**: md_v9117_infectious_mock_original.js. Exact question order, A–D options and *source-provided* answer key preserved as separate data; whitespace normalized from PDF. Original keys are **not independently validated** against current directive conditions.
- **Instructor's 6-page study guide**: deck is mapped through original bank's 55 review-point tags (360-question normal bank). No arbitrary new claims of textbook verification.
- **Additional 2-page peer review**: 26 prompts mapped explicitly to the existing lesson-tagged question bank, drawing about 180 distinct sourced original-bank questions. Mapping is to already-authored question IDs, not 130 newly written questions.
- **Lecture**: source-linked questions from uploaded 108-slide Chapter 39 presentation, retaining slide reference metadata.
- **Textbook**: nine new four-option questions adapted from Nancy Caroline Canadian 8e Chapter 39's 'YOU are the Paramedic' case summary and cleaning sections, PDF pp. 3396–3399, plus a separate lecture-question topic crosswalk. Do **not** describe that crosswalk as individually textbook-verified.
- **Previous bank**: 360 normal + 100 older high-yield preserved, plus 50 later high-yield and 15 combination questions in registered source modules.
- **Source hierarchy and question style**: see MED_DADDY_STANDARDS.md.

## Validation performed for v9.11.8
- Confirmed original mock has 130 distinct IDs, 130 four-option questions, and 130 source keys.
- Confirmed new source-deck and mock modules parse as valid JavaScript.
- Confirmed index script order: combinations, High-Yield hub, preserved mock, unified source-deck UI.
- Confirmed no auto-reload script referenced by index.
- Confirmed no changes requested or made to other course unit banks.

## Still outstanding — do not imply completion
- Full interactive, live-browser regression test of all navigation and study sessions.
- Complete **independent** question-by-question clinical and slide/textbook/PCP directive verification of original 460-question Infectious bank.
- Original mock's potentially erroneous/obsolete answers require a separate, flagged key audit while preserving the source copy unchanged.
- Review-based decks are *mapped subsets* of original questions; future writing can strengthen coverage, remove weak distractors and add genuinely new questions point-by-point.
- Source-linked textbook review includes nine directly adapted questions; remaining topic crosswalk requires manual source verification.
