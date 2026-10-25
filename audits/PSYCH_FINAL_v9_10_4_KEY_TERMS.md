# Med Daddy Psychology Final v9.10.4 — Key Terms Coverage Gate
Date: 2026-10-25

## Scope and source restrictions
Only the eight uploaded **post-midterm Psychology** sources are used:
- Final review.docx.pdf (44 printed keywords; the primary key-term checklist)
- Death.ppt
- Substance Abuse.ppt
- Alcoholism.ppt
- Suicide Newest.pptx
- Suicide Handout.docx
- Alcohol and Alcoholism Handout.doc
- Death and Dying Handout.doc

The earlier Psychology Midterm, PCT units, prior quiz banks and existing progress records were not modified. The original v9.10.3 index is archived as `v9.10.3_rollback_index.html`.

## New quiz module
`md_v1004_psych_key_terms.js` adds the **independently selectable** Key Terms Challenge in the Psychology Final.
- 44 review-sheet key terms cross-checked.
- 41 authored, source-linked, four-option single-best-answer quiz questions.
- 41 original correct-answer explanations and 123 individualized incorrect-answer explanations.
- Sessions of 10, 20, or all 41. Standard Med Daddy submitted-answer feedback is used.
- No inherited earlier Midterm items and no source-mock answer keys are mixed into scored practice.
- In the new module every item has a `keyTerm`, `sourceLocator`, and `reviewReference`.

## Three source gaps — not scored
1. **MAOIs** — mentioned only in the final review keywords. Mechanism or definition not supplied in the uploaded post-midterm lectures.
2. **TCAs** — mentioned only in the final review keywords. Mechanism or definition not supplied in the uploaded post-midterm lectures.
3. **Trap House** — listed in instructor keywords; review Q16 references a premises associated with methamphetamine production, but the provided lecture does not establish the precise meaning of "Trap House." Do not equate it automatically with a meth lab.
These appear in the new UI under "Instructor keyword checklist" rather than being scored with invented keys.

## Test checkpoint
- JavaScript syntax parsed.
- 41 unique key-term IDs; 4 choices each; 41 keyed responses; 123 wrong-option rationales.
- Answer letter distribution: A=10, B=10, C=10, D=11.
- Standard Final 50, Quick 10, High-Yield 50, Instructor Review 35, Lecture 24, Full Final 150, and standalone Key Terms 41/20/10 all launch correctly in the quiz-function test harness. No pre-midterm items appear in these launch pools.
- No direct-question stem overlaps found above lexical similarity threshold 0.49 against the existing 109-question Final bank; a full semantic deduplication and live-browser test remain open.
- Original 109 scored post-midterm questions untouched. After this addition, **150 final-only scored items** are available: the generic Final 50, Daily Review and Full Final 150 dynamically include the 41 additional keyword questions; the independent Key Terms Challenge remains selectable at 10, 20 or 41.
- The Psychology Final's original 35-point instructor review sheet **still** does not have five independently vetted questions per numbered point. This update is not a certification that the complete unit meets all ten Med Daddy acceptance requirements.

**Status: Key Terms Challenge operational in source and launched in simulated quiz tests; 3 source terms transparently unresolved.**
