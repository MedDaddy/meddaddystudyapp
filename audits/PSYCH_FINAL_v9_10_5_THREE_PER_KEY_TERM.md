# Med Daddy Psychology Final v9.10.5 — Instructor Key Terms Three-per-Term Checkpoint
Date: 2026-10-25
Status: **TERM COVERAGE CHECKPOINT PASSED. WHOLE PSYCHOLOGY FINAL STILL CONTENT-INCOMPLETE.**

## User requirement
- Three separately playable questions per instructor review-sheet key term.
- The correct terminology appears explicitly in a question stem or one of the four answer options for **every item**, with answer-key feedback and explanations.
- Keep Psychology Final strictly post-midterm source-only for its scored mixed exams.
- Preserve established Midterm, Abdominal and previous working versions.

## Inventory and source treatment
- `Final review.docx.pdf` contains **44 review keywords**.
- **41** are defined or explained in the supplied post-midterm lecture files and have **123** source-linked questions (3 per term).
- **3** are listed without adequate lecture definitions: **MAOIs**, **TCAs**, **Trap House**.
- The remaining **9** questions (3 for each) are placed in a **separate external-reference supplement**, not mixed into the Psychology Final 50, Quick 10, Daily Review, or Full Bank.
  - MAOIs: U.S. NCI Dictionary: https://www.cancer.gov/publications/dictionaries/cancer-terms/def/monoamine-oxidase-inhibitor
  - TCAs: NCBI MeSH: https://www.ncbi.nlm.nih.gov/mesh/68000929
  - Trap House: Dictionary.com: https://www.dictionary.com/browse/trap-house
- The key-term list's original spellings are retained as labels; medically correct terms such as **Wernicke encephalopathy** are also used in the question content.
- **Trap House** is not automatically equated to a site that manufactures methamphetamine. The instructor's review asks about meth-production premises separately.

## Modes and integration
- Original first question for each of the 41 course-sourced terms retained with its existing question ID (preserves prior key-term progress).
- Each term: (1) existing scenario/definition; (2) explicit term identification from a definition or alternative vignette; (3) contrast with related terms.
- Independent sets: all 123 / 50 / 20 / 10 / individual term 3.
- External supplement: separate 9 / individual external term 3.
- The 41 source-defined terms contribute **123 questions** to the standard Psychology Final pool, replacing the old 41. Old additional Psychology Final content remains **109**, giving **232** source-backed final items.
- Previous Psychology Midterm questions **not included**.
- Rollback index saved as `v9.10.4_rollback_index.html`.
- Source code files: `md_v1005_psych_terms_manifest.js`, `md_v1005_psych_key_terms_triads.js`, `md_v1005_psych_key_terms_ui.js`.

## Test evidence
- 44 unique key terms × 3 questions = **132**, with 123 in source-only course set and 9 explicitly external.
- 132 unique question IDs and 132 unique normalized question stems.
- Every question has an explicit keyword in the stem or answer options (or correctly spelled medical alias).
- Every item has four answer options, one encoded answer key, a correct-answer explanation and three wrong-option explanations.
- Answer position distribution over all 132: A=33, B=32, C=33, D=34.
- Simulated quiz launch counts pass at **123 / 50 / 20 / 10 / 9 / 3 / 3**; zero legacy Midterm items.
- Original 41-question launcher hidden and replaced by the three-per-term selector.
- All 3 new scripts pass JavaScript syntax checks; a full live browser UI test remains to be completed.
- Independent distractor plausibility and broad semantic near-duplicate review are not fully certified, despite targeted correction of repetitive identification stems.

## Remaining Med Daddy acceptance requirements
- **Five source-specific questions per each numbered Final Review objective** and separate handout review item: incomplete.
- **Three questions per every remaining explicit lecture-slide question**: incomplete.
- **Independent clinical review and exam-difficulty QA**: ongoing.
- Do not label the entire Psychology Final complete based on this keyword update.
