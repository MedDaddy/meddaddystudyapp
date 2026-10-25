# Med Daddy Psychology Final v9.10.9 — distractor and stem/key audit

**Scope:** Psychology Final only; earlier Psychology Midterm, PCT units, other A&P units, original source mocks and user progress storage are unchanged. Retains only the eight uploaded post-midterm course files for scored Final questions.

## Why the change was necessary
The supplied screenshot exposed an incorrect answer format: **“Which drug class correctly describes Rohypnol rather than GHB?”** had answer options describing drug effects, not classes. That question did not test what it claimed to test.

The broader audit found many implausible choices, absolutes (always, never, only), option/stem mismatches, and at least one wrong clinical distinction in the Wernicke-versus-Korsakoff comparison.

## Corrections released
| Scored subsection | Questions | Changed | Notes |
|---|---:|---:|---|
| Key Terms comparison question (third per term) | 41 | **41** | Reauthored options, matched prompt and key, three specific incorrect-option rationales |
| Instructor Final Review | 35 | **29** | Closer alternatives for clinical, psychological and instructor-specific facts; six retained |
| Lecture Slide expansion questions | 24 | **24** | Replaced over-obvious answers with toxidrome, differential and assessment options |
| High-Yield Concepts | 50 | **50** | Rewrote each item's distractors and three wrong-option rationales |
| Key Terms identification/scenario (first two per term) | 82 | 0 | Deliberately lower-difficulty vocabulary learning: now labeled Key Term Recognition / Key Term Identification, NOT “Instructor Hard” |
| **Total post-midterm Final** | **232** | **144** | 41+29+24+50 |

The separate **9 external-reference exercises** for MAOIs, TCAs and Trap House remain isolated from all course-source Final exams.

## Rohypnol example now correctly keyed
**Question:** Which drug class correctly describes Rohypnol (flunitrazepam) rather than GHB?
- A: **Benzodiazepine** — correct
- B: Barbiturate — a different sedative class
- C: Dissociative anaesthetic — e.g. ketamine, a different class
- D: GHB-type CNS depressant — a separate depressant, not flunitrazepam's class

This is a true **class-identification** question rather than a “which vaguely true drug effect?” question.

## Core acceptance checks
- Same original source-linked correct answers for all 144 revised items; no unsupported clinical answer-key change.
- Four options, one keyed best answer, three specifically matched incorrect-option explanations for each revised question.
- Original question source reference retained; all revised IDs gain `R` suffix so previously completed weak versions do not block new adaptive review sessions.
- JavaScript syntax verified for all new files.
- Full simulated code-integration test: **232 course-source Final questions + 9 isolated supplemental**, all unique IDs with valid four-option structure and reasons; zero duplicate options within items.
- Revision patches loaded in dependency order; earlier Midterm items are not imported.
- Web release: v9.10.9 index; preserved rollback indexes v9.10.5, v9.10.6, and v9.10.8.

## Remaining acceptance risks — DO NOT MARK ENTIRE UNIT COMPLETE
- The first two questions for each term (82) are intentionally introductory **vocabulary recognition/identification**, not instructor-level discrimination. Source-appropriate alternatives remain but were not all reauthored this release.
- Independently complete five meaningful questions per review-sheet point and three per every explicit slide question remain unmet (per established ten-part Med Daddy standard).
- Semantic duplicate detection and human clinical key scrutiny across **all** 232 are not completely certified; automated QA is not equivalent to instructor review.
- Real-browser, cross-device verification of the newly published version remains to be performed.

**Release status: high-priority Psychology Final distractor defects substantively corrected; content coverage as a whole is still not complete under the Med Daddy ten-point standard.**
