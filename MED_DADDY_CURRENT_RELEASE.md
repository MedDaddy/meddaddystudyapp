# Med Daddy — Current release and source-deck inventory
Updated: 2026-10-29
**Current repository version:** v9.11.11
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

## v9.11.10 — Infectious PCP Directives 50
- A separate 50-question Ontario PCP directives and BLS standards exam deck is integrated into the EXISTING Infectious Diseases source selector, not a standalone mini-app or new page. The same 50 questions are included in the Full Infectious bank.
- Source files: `md_v91110_infectious_directives_a.js` (25), `md_v91110_infectious_directives_b.js` (25), `md_v91110_infectious_directives_hub.js` (integration). The index loads source A and B, the existing unit hub, then the new integration hub.
- Topics: Fever/sepsis, Dysphagia/epiglottitis, Croup Medical Directive, Bronchoconstriction Medical Directive, Auxiliary IV and Fluid Therapy, Bite Injury, Oxygen Therapy. References: BLS PCS 3.4 and ALS PCS 5.4.
- QA run: source files parse; 50 unique question IDs and stems; each has four distinct choices, one answer key, detailed correct and per-distractor explanations. Checked against the app's `mdLeakReason`; all 50 passed. Registration and selector/full-bank integration passed an executable JS simulation (50/50 registered; dropdown option present). **Live user-browser interaction still unverified.**
- Existing mock, reviews, other units and local progress keys are unchanged. Auto-reload remains disabled.

## v9.11.11 — Home-screen PCP Medication Mastery rebuild (2026-10-29)
- User reported **86% on the PCT II Infectious Diseases exam on 2026-10-29** after one night of dedicated study while working. Confirmed recent results: Environmental 88%, Endocrine 86%, Infectious Diseases 86%. Keep these separate from in-app practice results.
- User expressly identified the Infectious Diseases 50-question directive testing as the new gold standard and requested that same challenging scenario structure for **PCP medications testing accessible from the home screen**.
- Added `md_v91111_pcp_med_gold.js` to the deployed main page following all existing baseline and unit patch scripts; version and script cache now use v9.11.11. **No existing question bank replaced or deleted.**
- Existing source-based banks: 120 original PCP medication questions (30 medication/formulation entries), plus 298 PCP Scenario Mastery questions. Of the latter, **285 clinical questions** match medication topics, MED CHECK/MACC, integrated plans, or medication-bearing directives. New home-screen medication mode combines these into **405 distinct questions**, including 285 clinical scenarios.
- New compact menu, following the approved Infectious Diseases layout: Clinical Directive Decisions (default), MED CHECK & Integrated Treatment Plans, Medication-Specific Scenarios, Dose Calculations & Thresholds, All Questions, Original Foundations. 50/75/100/full sessions; no small-quiz grid.
- Core rules: four choices, exact keyed option, distinct wrong-answer explanations, tested authorization/scope conditions; source records/IDs preserved; existing safety registry checked; same Med Daddy adaptive progress. No automatic reloads.
- Runtime simulated test: 50 distinct registered scenario questions launched successfully; core modules passed JavaScript syntax checks. **Live hosted/browser test blocked by environment policy** and remains unverified.
- This update **curates and restructures existing source-anchored medication and scenario questions**; it does not constitute a newly authored 405-question bank or an independent medical audit of every case. Do not claim otherwise.

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
