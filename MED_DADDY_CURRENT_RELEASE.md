# Med Daddy — Current release and source-deck inventory
Updated: 2026-10-27
**Current repository version:** v9.11.7
**Repository:** MedDaddy/meddaddystudyapp (main)
**Unit:** PCT II Infectious & Communicable Diseases

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

## Validation performed for v9.11.7
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
