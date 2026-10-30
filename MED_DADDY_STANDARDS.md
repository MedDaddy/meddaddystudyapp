# Med Daddy — Established Project Standards
Updated: 2026-10-30. This document is the persistent source of truth across ChatGPT conversations.

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

## PCT II Medications Unit — established gold standard (user confirmed 2026-10-28)
- **Adopt the successful Infectious Diseases 50-question PCP Directives deck as the mandatory quality benchmark** for the upcoming all-medications PCT II unit. The user explicitly confirmed this was the style that helps most; do not regress to easy recall, generic distractors, or superficial explanations.
- Build **at least one complete, integrated 50+ question medications practice deck** in the existing Med Daddy UI, with standard 50/75/100/full exam sizes where available, not a cluster of small quizzes. Keep source decks and preserved mocks distinct.
- Questions should predominantly be **realistic PCP scenarios** with pertinent age/weight, vitals, symptoms, medication history, prior doses, allergies, level of awareness, stability and reassessment findings. Test the field decision, not just memorized drug definitions.
- Cover each medication and relevant Ontario PCP medical directive in the uploaded class material: **indications, contraindications, age/weight and vital-sign thresholds (including strict versus inclusive cutoffs), dose, concentration, formulation, route, maximum single and cumulative doses, intervals, repeats, sequencing, MED CHECK, need to patch/seek authorization, withholds, documentation, reassessment, adverse effects, and changing priorities.**
- Include accurate calculation problems for mg, mcg, mL, mg/kg, concentration, max-dose caps and relevant administration rates **only when supported by the course materials and current, applicable Ontario PCP directives**. Show the arithmetic in the post-answer rationale, never telegraph the key in the stem.
- Use **high-quality competing plans** and numbered combination options that test a *collection* of appropriate medications/actions (e.g., select 1, 2, and 4), plus subtle instructor-style qualifier traps. Each of four options must be plausible, and exactly one is defensibly best.
- For each item, include a specific rationale for the key **and separate, substantive rationales for every incorrect choice**; explain the exact condition, calculation, or scope rule that makes it wrong.
- Anchor questions in the **actual uploaded medication lecture, reviews, textbooks and applicable Ontario BLS/ALS PCS**; check exact revision of directives at build time. Preserve instructor-original mocks unchanged and flag their errors separately. Never invent a dose, threshold, protocol, or authorization or use general medical practice to silently replace a course source.
- Independently audit every deck for pharmacologic accuracy, math, answer leakage, distractor realism, ambiguous cases, near duplicates, scope errors and working startup. Preserve all existing units, saved progress, source provenance and the accepted clean Infectious Diseases UI.
- Treat the Infectious Diseases directive set as the **reference implementation**, not a bank of stems to copy with different drug names. Build genuinely varied and source-specific medication reasoning problems.

## PCT II ECG Unit — 4-lead versus 12-lead gold standard (2026-10-30)
- **Two distinct, selectable ECG tracks:** 4-Lead Rhythm Interpretation (cardiac anatomy and conduction; pacemaker rates/failures; waveform/interval timing; paper/rate calculations; P–QRS relationships; AV blocks; sinus, atrial, junctional, ventricular and paced rhythms; patient stability/PCP decisions) and 12-Lead Interpretation (electrode landmarks; axis; coronary territories; ST/T and J-point analysis; reciprocal changes; posterior and right-sided extension; ischemia/infarction; BBB/STEMI mimics; current Ontario STEMI bypass decisions).
- Use a clean standard unit launcher and 50/75/100/full sessions; **default Instructor-Level Challenge** with heavily weighted new scenario/application questions. Keep 50-image-only original rhythm-strip practice and genuine 12-lead image inspection available in the correct sections. No 10- to 20-question micro-shortcut grid.
- Never manufacture or redraw alleged **authentic course tracings**. Preserve original image and provenance. Never label a 12-lead tracing with a diagnosis absent from the source without independent verification. Text-only scenarios must be identified as text-only.
- Preserve uploaded `ECG Practice (1).pdf` (20 four-lead + 30 twelve-lead original questions) as a distinct **original-preserved mock** once the actual PDF strip images, options and source keys can be faithfully imported. A separate unrelated authentic ECG strip bank does not substitute for that mock.
- Each uploaded ECG study guide or review gets an independent coverage map; expand 5 unique questions per review prompt when supportable, including challenging anatomy/theory/interpretation questions—not exclusively directive questions.
- Use the Chapter 30 textbook/lectures, 4-lead slides, 12-lead CTS teaching, ECG study tool, and other uploaded references. Treat old STEMI-bypass handouts as historical; **verify current Ontario BLS/ALS PCS separately** before using authorization or bypass thresholds.
- Audit unsafe shorthand (“irregular means AF,” “wide QRS means ventricular”): these are not universal rules. Challenge differential diagnoses and the context of the actual patient.
- Use the same successful Infectious/Medications directive-quality 4-option, one-best-answer, rationale-for-every-choice, source-anchored, no-answer-leakage standards. Verify live navigation, image loading, registry, preserved progress and question selection before claiming fully completed.

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
