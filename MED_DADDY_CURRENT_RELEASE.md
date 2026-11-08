# Med Daddy — Current release and source-deck inventory
Updated: 2026-11-07
**Current repository version:** v9.11.17
**Repository:** MedDaddy/meddaddystudyapp (main)
**Current new unit:** A&P II Lymphatic & Immune Systems

## v9.11.17 — Final A&P II Lymph question-quality and cleaned-mock release
- **254 active Lymph questions:** 127 new source-linked, 127 reviewed deduplicated source-mock items. The original two 250-item source PDFs are archived in GitHub, not presented as 500 playable questions.
- Original mocks included 184 repeated stems, extreme answer-B bias (A 230/250 B and B 227/250 B), mixed-in unrelated PCT topics, and at least one conflicting/ambiguous original key. The new cleaned 127-Q A&P practice set has one concept per stem and source provenance.
- Answer positions are **reordered with the correct answer text**, never just the letter, producing 127-Q distribution **A32, B32, C32, D31**. Question order shuffles each practice session; per-question option positions are stable for progress consistency.
- Editorial review of authored A&P items strengthened **87 distinct questions** (88 patch edits: first pass 24 review + 35 lecture, additional 16 review + 13 lecture with one overlap). Specific explanations were rewritten for all changed distractors.
- Latest simulated QA: 254 unique registered IDs, zero invalid answer mappings, zero duplicate active stems between authored and cleaned source mock, 50/70/100/127 sessions launched as configured, no changes to saved progress or unrelated units. Release HTML and in-app title now v9.11.17.
- Full detail: `A_P_II_LYMPH_SOURCE_AUDIT.md`. **Outstanding** live visual/browser QA and any external instructor signoff of historical mock keys.

## v9.11.16 — Corrected A&P II Lymph mock and authored-question audit (2026-11-07)
- **User identified true QA failures** in the earlier v9.11.15 Lymph release: original mock duplicates/500 inflation, answer key overwhelmingly B, and a concern about authored-question difficulty. Audit confirmed these.
- Original 500 preserved PDF mock questions contained **184 duplicate stems**, leaving **316 distinct stem strings** before curriculum relevance checking. Raw Mock A marked B in 230/250, and raw Mock B marked B in 227/250. Competing/repeated answer text had 24 differences, including the thoracic duct versus cisterna chyli; source items with questionable/ambiguous keys were excluded, not blindly taught.
- **Cleaned playable Lymph mock now exactly 127 unique A&P course-screened questions** (114 selected from Mock A, 13 from Mock B). Original PDF mock sources and original answer keys remain archived untouched, but are no longer available as redundant/biased 250-item study decks. All active source items retain provenance and original key in metadata.
- Shuffled option ordering was created with correct **answer content kept fixed**, then correct A–D keys recalculated. Final distribution among 127 source-mock questions: **A 32 / B 32 / C 32 / D 31**. Session *question order* shuffles; option-letter placements are stable across sessions to protect question IDs and progress consistency.
- **Authored bank quality audit corrected 59 weak distractor sets** (24 instructor review + 35 lecture). These now use closer, content-based distractors and specific wrong-answer rationales. The 127 authored questions remain source-referenced with one keyed answer each.
- **Only 254 Lymph questions are active**: 127 newly authored and 127 deduplicated/mock-screened. High Yield 50 is a subset of 127 authored. Old 500 kept for source provenance but not registered as playable questions.
- Verified 254 safe-registry entries; simulated 50/100/full clean mock, 50 High Yield, 100/full Science, 70 Review and 57 Lecture all launched with unique registered items. Correct answer option content, key distribution and script order validated. No progress reset, auto-update or unrelated unit modifications. **Live browser QA remains outstanding.**
- Full details: `A_P_II_LYMPH_SOURCE_AUDIT.md`.

## v9.11.15 — A&P II Lymphatic & Immune Systems (2026-11-07)
- Built a new A&P II unit on the existing study home for the **November 10 Lymphatic exam**.
- Source backbone: uploaded **Patton 11th edition Ch 31 (Lymphatic), Ch 32 (Innate immunity), Ch 33 (Adaptive immunity)**; 14-item instructor review; 69-slide Immune System lecture; two different 250-question original mocks; marked immune practice feedback (topics, not private wording). Kahoot link not retrievable, so not imported.
- **127 new source-linked and original authored A&P questions:** 70 (14 review points × five distinct questions each) and 57 (19 lecture Quick Quiz prompts × three distinct questions each). Every authored item has 4 plausible choices, one keyed answer, and individual rationales for all distractors; direct private-test-style stems rather than abstract filler.
- **500 separate preserved source mock questions:** `A&P II LYMPH mock.pdf` and `A&P II Lymph Mock (1).pdf`, each 250 questions with original order and key kept. These are **source-unverified answer keys**, not newly audited facts or blended into the teaching bank.
- Six study selections on the clean unit page: High-Yield 50 (balanced subset of review 70), Complete A&P Science 127, Instructor 14-Point Review 70, Immune Lecture 57, Original Mock A 250, Original Mock B 250. Available 50/75/100/full sessions as source size allows. No small redundant quiz tile grids.
- Runtime-simulated launch checks: 50 High Yield unique, 100/full 127 A&P Science, full Review 70, full Lecture 57, and both mock 250 sessions in original order; 627 total IDs registered with no collision. No auto-reload or saved-progress clearing. **Live browser QA not confirmed.**
- Details and outstanding risks documented in `A_P_II_LYMPH_SOURCE_AUDIT.md`.

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

## v9.11.14 — Original 100-question ECG Mock (2026-11-01)
- Imported the newly supplied **ECG Mock.pdf** (16 pages, 100 text-based questions, original key on page 16) as its own preserved 100-question ECG source deck.
- The new **Start Original 100-Question Mock** launcher sits inside ECG Academy, accessible from either the 4-lead or 12-lead track. Original question order, all four answer alternatives, source-provided answer key and page/section references preserved.
- This text-only 100-question mock is **not** the separate visual 50-question `ECG Practice (1).pdf` previously uploaded. The 50-question original strip mock remains outstanding for import.
- Detected and flagged suspected source-key errors in original global questions **99 and 100**. Kept the supplied keys unchanged; warnings are included in the post-answer explanation. Other 98 keys are original/unverified, not certified correct.
- Verified by executable launch simulation: 100 unique registered questions; 100-question session starts in original order with source keys unchanged; no stats reset and no new 10-question tiles; auto-updater remains disabled. Live browser rendering remains unverified.

## v9.11.13 — ECG rhythm-strip-only default and concise cases
- User confirmed they want a dedicated test **only using supplied rhythm strips** and complained that the new ECG questions were too abstract/wordy.
- **Location:** Home → PCT II → ECG Academy → 4-Lead Rhythm Interpretation → Practice focus: **Rhythm Strips Only — 66 authentic course images** (now the *default* option) → 50 questions → Start 4-Lead Exam.
- A separate **50-question image-only mode** uses original ECG study-tool strip images: actual source image is displayed **above four rhythm alternatives**, with the short stem "Identify the rhythm shown." The underlying image IDs, originally keyed correct rhythm names, and course provenance are retained. The supplied `ECG Practice (1).pdf` 50-item mock still remains a separate outstanding import.
- Simplified all **72 newly written ECG question stems** without altering keys, answer choices, individualized post-answer rationales, or source references: 4-lead new 25 items average 158→84 characters; review new 10 average 145→73; 12-lead new 37 average 117→79.
- Existing 188 ECG questions and 95 source strip images / 16 full 12-lead gallery images remain intact. Current full-bank sizes 199 four-lead and 61 twelve-lead; all 72 newly written items retained.
- Confirmed by reading the original embedded app that its shared quiz renderer displays `ECG_STRIP_MAP[imageId].image` above choices. Original 66 image question answers exactly match course strip labels; all source image IDs resolve.
- Functional JavaScript launch tests: 50 image-only questions, 50 actual images, no text-only questions and all canonical safety registry prompts consistent; 50 unique 4-lead challenge questions (35 new); 50 unique 12-lead challenge questions (35 new). No stored-progress clearing, no auto-reload.
- New website version/title v9.11.13 committed; **live GitHub Pages browser visualization remains unverified**.

## v9.11.12 — PCT II ECG rebuild (2026-10-30)
- 11 user-uploaded ECG materials inspected; full inventory, source provenance and outstanding mock image-import work documented in `ECG_REBUILD_SOURCE_AUDIT.md`.
- Preserve existing ECG Academy's 188 source-linked questions and original visual assets (95 real rhythm strips, 16 12-lead tracings). Existing 66 image-based rhythm questions remain playable.
- Added 72 new four-option instructor-hard questions across 4-lead (25), 12-lead (37) and the PCT II ECG instructor review (10). Every added question has one key, topic/source metadata and specific explanation for each wrong option. Strict source distinction between 2019-era teaching and current Ontario BLS PCS v3.4 STEMI bypass criteria.
- New normal ECG Academy has two **distinct tabs**: 4-Lead Rhythm Interpretation and 12-Lead Interpretation, with clean standard 50/75/100/full exam launcher and relevant original image gallery under each track. Old shortcut grids hidden; PCT II home menu retains Open ECG Academy.
- Current full bank: **260** questions, **199** in 4-lead and **61** in 12-lead. These track numbers partition original and new records without overlap.
- Default instructor challenge: 50Q 4-lead contains **35 new hard questions plus 15 original visual strip questions**; 50Q 12-lead contains **35 new hard questions and 15 previous course questions**. Dedicated authentic strip mode produces **50 image-based questions**, source images unchanged. 12-lead full deck gives 61.
- Core quiz safety registry checks preserved; no old IDs removed, no local progress clearing, no auto-updater. Version label/cache updated to 9.11.12.
- Executable simulated runtime checks: both tracks launch 50 distinct registered questions; visual strip mode yields exactly 50 images; full 12-lead selects 61, all unique/registered. New scripts parse and 72 new questions pass structure, rationales and answer-leakage checks.
- **Not completed:** independent live-browser regression; original `ECG Practice (1).pdf` 50-item image-based mock as a separately playable deck; `Question 1(1).txt` as standalone preserved exam; expanding all 13 ECG instructor review prompts to five new questions each; item-level clinical audit of previous 188 questions. Never claim these are finished.

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
