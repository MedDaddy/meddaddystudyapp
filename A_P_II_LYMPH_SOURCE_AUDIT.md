# A&P II Lymphatic & Immune Systems — Source & Release Audit
Updated: 2026-11-07. Med Daddy v9.11.15. Exam: Tuesday November 10, 2026.

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
