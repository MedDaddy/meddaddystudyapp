# Med Daddy — Established Project Standards
Updated: 2026-10-27. This document is the persistent source of truth across ChatGPT conversations.

## Release workflow
- Work on the currently deployed GitHub **main** branch, after checking the live version. Never replace newer code with an old local build.
- Deliver a complete, integrated, validated Med Daddy release. No separate mini apps or staging files presented as a completed update.
- Preserve every other unit, interface conventions, bank, saved user progress, and backward compatibility.
- Keep rollback history and version numbering; verify script load order, syntax, question bank registration, working start controls, and no unexpected reloads. Do not add automatic mid-session page reloads.
- Keep the interface clean and coherent across PCT II and A&P II units. No developer status panels or redundant 10-, 15-, 20-question shortcut tiles.
- For **generated practice exams**, minimum selectable length is 50 questions. Allow 50, 75, 100, or full bank as available. A topic selection containing fewer than 50 does not silently produce a short exam.
- Preserved uploaded mocks keep their **original question count**; do not pad or alter an original mock merely to reach 50.
- Maintain the iPhone AI MCQ Answer Lab as an entirely separate repository/product; no cross-links or integration.

## Source policy, in priority order
1. Original uploaded lectures/slides and relevant uploaded textbook chapters.
2. Applicable Ontario PCP BLS PCS and ALS PCS (scope of practice, authorization, dosing, clinical constraints).
3. Instructor study guides and user-provided reviews, used to direct exam coverage.
4. Peer-written mock exams and alternate-test notes, used to predict emphasis and phrasing, **not** as authority when inconsistent with lectures or scope.
- Trace questions to the specific slide, review item or textbook section where available; never fabricate a citation.
- Never silently override the exact text of a preserved mock; flag suspected incorrect/ambiguous keys separately and explain any conflict.

## Permanent preserved mock policy
- **Every uploaded mock** is added as its **own named, accessible, original-preserved question deck**. Preserve question wording, ordering, answer options, and supplied answer key when present.
- Clearly distinguish source-supplied keys from independently verified answers; annotate suspected errors in a separate quality report, not by silently altering the preservation copy.
- Keep preserved mocks separate from generated questions and random exam pools unless intentionally included by the user.

## Permanent review-deck policy
- **Every uploaded review** gets its own named, distinct derived question deck, with complete coverage mapping item-by-item.
- Default coverage target: **five nonduplicate questions for each review point** where the source supports that depth; prioritize substantive, defensible questions over filler.
- Keep review-derived decks separately selectable, in the standard unit screen, with at least 50 questions per generated session when the deck has sufficient items.
- For infectious diseases, preserve the Chapter 39 slide/textbook core, the earlier instructor guide/high-yield bank, the later peer review, and the separate mock rather than merging or losing their provenance.

## Question quality — PCT II
- Multiple choice with exactly four answer options, **one defensible best keyed choice**.
- Instructor-level difficulty; patient information sufficient to reason; clinically meaningful, credible distractors, realistic symptoms and vitals when useful.
- Harder exam-style combinations are allowed: “both A and B,” “all of the above,” “neither,” and numbered process collections such as “1, 3, 5, 6.” Use sparingly and only when logically defensible; ensure one key and no accidental second correct combination.
- For directive steps, distinguish assessment, indication, contraindication, order, treatment, reassessment, and escalation; never imply an unauthorized PCP intervention.
- Answer rationale must explain why the key is best and specifically why each competing option is wrong, not generic boilerplate.
- Zero answer leakage (headings, dash/colon, embedded diagnosis, keyed phrases), no duplicate/near-duplicate stems, no implausible throwaway distractors, no stem/key mismatch, no unsupported details.
- Follow user exam feedback, including tricky wording and selective factual recall; maintain strong Ontario BLS/ALS directive emphasis overall.

## Question quality — A&P II
- Use the same four-option, one-key, detailed-explanation QA standard.
- Prioritize terminology, anatomy, physiology, mechanisms, processes, sequences, cause/effect, subtle distinctions and exam-style wording over long PCT clinical scenarios.
- Instructor-hard without artificial trickery; cover all uploaded review points with multiple defensible variants.

## Study-mode rules
- Explain the selected answer after each question. Keep the screen uncluttered.
- Subsequent adaptive sessions favor **previously missed** and **entirely new** questions. Preserve the user's progress and statistics keys.
- No unnecessary repeated incorrect-answer boilerplate.

## QA before describing work as complete
- Verify source coverage, factual accuracy, PCP scope, answer keys, combinations, distinct plausible options, duplicates, leakage, rationale specificity, and quiz runtime behavior.
- Report remaining unverified or unfinished checks candidly. Do not call a staged file or a basic syntax check a full tested release.
