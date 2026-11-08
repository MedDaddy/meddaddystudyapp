# A&P II Lymphatic & Immune Systems — Source & Release Audit
Updated: 2026-11-07. Current v9.11.17; previous release findings retained.

## v9.11.17 — Complete second editorial pass and final registration checks (2026-11-07)
- Following the first 59 question repairs, a second review also found remaining too-obvious alternatives. Added **16 more review edits** and **13 lecture edits** via `md_v91116_lymph_quality_review_final.js` and `md_v91116_lymph_quality_lecture_final.js`. One lecture item was improved in both passes: **88 edit operations across 87 distinct questions**, with all correct answers, source locators, and IDs retained.
- Replaced out-of-domain/giveaway choices with plausible anatomy/immune near misses, including competing lymph drainage routes, lymphatic pump mechanisms, fluid compartment choices, splenic tissue types, immunoglobulin classes, complement effects, immune cell lineages, and true differences between innate/adaptive pathways.
- Guarded Lymph unit loading on all **five** quality patches (24 + 18 + 17 + 16 + 13 changed questions), and on the 127-question cleaned source mock audit. A missing patch blocks launch rather than quietly dropping approved question difficulty.
- **Final v9.11.17 executable test:** 254 unique registered Lymph IDs; zero malformed authored choices or absent individualized rationales; zero incorrect answer-content remappings in cleaned source mock; no exact prompt overlap between authored and cleaned banks.
- Each available launcher succeeded in simulation: High Yield 50, complete Science 127, Science 100, Instructor Review 70, Lecture 57, cleaned mock 50/100/all 127. Full 127-question cleaned mock correct letters remain **32 A, 32 B, 32 C, 31 D**.
- Caution: no live web-browser end-to-end test, no independent instructor answer-sheet signoff and no exam-performance calibration yet. The strict check shows the current code is internally coherent, not that every possible clinical interpretation has been independently certified.

## v9.11.16 — Corrective source, duplication and difficulty audit (2026-11-07)

### Original source mock problems found
- The two preserved source PDFs contain **250 + 250 = 500 questions**, not 500 independently useful concepts. **184 repeated stems** were found after case/spacing/punctuation normalization, leaving only **316 distinct stems before any relevance or clinical-quality filtering**.
- Both supplied answer keys are extremely letter-biased: **Mock A: B = 230/250 (92.0%); Mock B: B = 227/250 (90.8%)**. This itself is a test-taking cue and is unacceptable for a generated practice test.
- 24 repeated-stem comparisons had different literal answer text. Some are synonymous paraphrases; at least one materially conflicts: **Mock A #16** keys *cisterna chyli* as the main drainage basin for the lower body/upper-left quadrant, whereas **Mock B #12** identifies the *thoracic duct*. The thoracic duct is the actual major drainage route; the cisterna chyli collects lymph from lower regions into the duct. The ambiguous/conflicting question was **excluded** rather than silently rekeyed.
- Mock B #85 uses *variable regions*, *binding sites*, and *Both B and C* as competing answers, making the single-best-answer construction unreliable. **Excluded** from the cleaned version.
- Many original mock questions are **not an A&P Lymphatic/Immune review** at all, but general PCP medications, dose math, pneumonia/COVID/Croup/Sepsis/EMS policies, ECG/other drug management, etc. These were retained in the original archived PDF source banks, but **excluded from the playable A&P mock**. Obvious duplicate concept/reversed-question repetitions and potentially misleading wording were also excluded.
- Both raw 250-question GitHub source modules remain unchanged in version history and available for source comparison. They are **no longer available as duplicate-filled 250-question buttons** on the current study UI. Original key and original source item/page remain in selected clean-item metadata.

### New course-screened playable mock
- `md_v91116_lymph_clean_mock.js` produces **127 distinct course-relevant, screened A&P questions**, from **114 original Mock A items and 13 original Mock B items**. No repeated normalized stems remain in this curated selection.
- Every question retains its source text and original correct **answer content**. Alternative ordering is rebalanced, and the answer letter is **recalculated from the position of that same correct answer content**, not merely changed. Relative-letter options (“Both A and B,” etc.) are excluded from shuffling.
- Correct answer letters across the full 127-item mock: **A 32, B 32, C 32, D 31**. Question order is shuffled at session launch; individual option placement is prebalanced and stable between sessions to protect original question IDs and progress integrity.
- All 127 selected questions have an item-specific brief rationale connected to Patton 11e Ch 31, 32 or 33, and original source metadata. **This is a course-screened cleaned practice version, not a claim that every original unselected mock answer was right.** The original PDFs and original source-key records remain independently accessible in GitHub.
- New active A&P Lymph unit question count = **127 authored course items + 127 curated mock items = 254 unique IDs**. High-Yield 50 is a subset of the 127 authored, not an additional fifty.

### Independently audited original authored questions
- The initial v9.11.15 verification covered **technical structure** (unique IDs, exactly 4 answer choices, key/rationale presence, source metadata). That was not an adequate editorial instructor-difficulty audit.
- A stronger editorial pass found **59 originally authored questions with at least one obviously weak, implausible or out-of-domain distractor** (24 instructor review + 35 lecture), though the original keyed answers themselves appeared consistent with the uploaded course materials.
- Repair modules `md_v91116_lymph_quality_review.js` (24), `md_v91116_lymph_quality_lecture_a.js` (18), and `md_v91116_lymph_quality_lecture_b.js` (17) replaced these distractors with realistic immune-system/lymphatic alternatives and **new specific explanations tied to each new wrong option**. Correct answer strings, original IDs and source links retained. The lecture item about interferon was rephrased for a precise one-best answer.
- Post-repair: **127/127** authored questions retained, 127 distinct stems, A–D key spread **32/31/32/32**, unique four-option choices, complete correct-answer rationale and three specific distractor explanations. Static checks revealed no duplicate IDs or literal answer leakage. **This improves, but cannot guarantee, equivalence to the real instructor exam without student performance and live QA.**

### Runtime and release checks
- Mock answers remain text-key consistent after the option reorder. **127/127** cleaned mock IDs are unique and all retain original provenance; balance 32/32/32/31 checked.
- Existing Med Daddy safe-question registry receives exactly **254 active unit questions**; all other unit banks are preserved, no data clearing and no auto-update.
- Simulated starts: High-Yield 50, A&P Science 100, full A&P Science 127, full Review 70, Lecture 57, clean Mock 50, clean Mock 100, clean Mock full 127. All selected questions were registered and unique for their session; source mock answer distributions remained mixed, not B-dominated.
- Website `index.html` version **9.11.16** injects all remediation scripts in correct dependency order before the Lymph unit launcher.
- **Remaining limitation:** a separate live browser visual regression / real-session grading check was not available. The manual course-screening is not the same as a clinical expert certifying every historical mock answer. Flag any later discovered source contradiction rather than quietly adjusting it.

## Sources used
- **Patton, Anatomy & Physiology, 11th edition**, user-uploaded ebook: **Chapter 31 Lymphatic system**, **Chapter 32 Innate immunity**, **Chapter 33 Adaptive immunity**. Exact chapter labels verified against the epub table of contents; not generic textbook guesses.
- **Lymph immune review.doc**: 14 original instructor review points; exactly five newly authored, source-located questions for every point (70).
- **Immune System.ppt**: 69-slide course lecture. Contains 19 embedded Quick Quiz prompts on slides **7, 25, 33, 54, 61 and 68**; three newly authored questions for every prompt (57).
- **A&P II LYMPH mock.pdf**: 31 pages, original 250 four-option questions and supplied answer sheet; imported into its own preserved source deck, including 7 source subsections.
- **A&P II Lymph Mock (1).pdf**: 31 pages, original 250 four-option questions and supplied answer sheet; imported into its own separate preserved source deck, including 6 source subsections.
- **What are the two main types of assa.txt**: private marked immune practice (10 questions). Its feedback helped reinforce the targeted themes in the new questions (innate/adaptive, self/nonself, NK, complement, T/B cells, active/passive, secondary response). Original private text is **not published** in any question bank.
- **Kahoot solo link** (quiz id ceff2472-c916-405e-b127-0903498cba85): external page could not be fetched in current environment. No questions imported or claimed from this link.

## New bank
- `md_v91115_lymph_review_a.js` and `md_v91115_lymph_review_b.js`: **70 instructor review questions**, five per 14 topics, each with a correct explanation, separate substantive explanations for the three incorrect answers, and a reference to the review point / Patton chapter.
- `md_v91115_lymph_lecture_a.js`, `md_v91115_lymph_lecture_b.js`, `md_v91115_lymph_lecture_c.js`: **57 instructor-level immune lecture questions**, three per 19 Quick Quiz prompts, with slide + chapter locator and separate rationales for every alternative.
- **127 newly authored distinct A&P questions**, direct wording and close alternatives; high-yield 50 is a **balanced subset** of the 70 review questions, not an additional 50 unique items.
- `md_v91115_lymph_mock_a.js`, `md_v91115_lymph_mock_b.js`: **500 preserved original source questions** across two separate mocks. Source order, question text/choice text and supplied original answer keys preserved; only PDF extraction whitespace/line wraps normalized. No key rewriting and no original questions blended into authored science bank.
- **627 unique questions available within the unit** (127 new + 500 source originals). The original mock answer keys are supplied by the PDF author and **have not been independently medically verified**. These PDFs include some PCP treatment questions beyond normal A&P exam science; they remain only in their original-preserved decks.

## UI and test modes
- Added an A&P II unit card on the existing study page, opening a dedicated Lymphatic/Immune screen.
- High-Yield 50 (50 balanced A&P questions), Complete A&P Science (127), Instructor 14-Point Review (70), Immune Lecture Quick Quiz (57), Original Mock A (250), Original Mock B (250).
- Source counts in each deck vary; available 50/75/100/full session sizes depend on bank length. Full mocks keep original order; other sessions shuffle for fresh practice. No short 10-question tile grid.
- Uses the current quiz engine and MD_SAFE_QUESTIONS registry, answer feedback, scoring/statistics and saved progress. No local-storage clearing or mid-session auto-update introduced.
- The separate private-test question style (short direct instructor prompts, four close alternatives, no unnecessary scenarios) informs the authored 127, but the private test itself is not exposed.

## QA confirmed
- JavaScript syntax checked across all eight new scripts.
- Runtime simulation created all 627 unique question IDs; validated 14×5 review coverage and 19×3 lecture prompt coverage.
- Question records have four unique alternatives, A/B/C/D key; 127 authored questions contain specific correct and incorrect rationales; no literal answer-string leakage found.
- Functional simulated launches: High Yield 50 (50 unique), Full Science (127), Science 100 (100), Review (70), Lecture (57), Mock A full (250 in original order), Mock B full (250 in original order). Each question passed registry checks.
- Existing Med Daddy units left intact; loaded after all existing unit scripts. Web title and version set to v9.11.15.
- **Outstanding:** independent validation of all 500 original source answer keys, full visual browser regression (including small-screen placement). The original mocks remain marked source-unverified rather than being silently corrected.

## Content/clinical scope
- Authored bank is **Anatomy & Physiology II**, not PCT II directive testing. No new medication protocol questions were invented; original source mock PCP questions are preserved only as uploaded, with the source key not endorsed.
- Where historical/instructor source details differ, course lecture + assigned Patton chapters define academic content. Current Ontario directives remain authoritative only for actual paramedic interventions.
