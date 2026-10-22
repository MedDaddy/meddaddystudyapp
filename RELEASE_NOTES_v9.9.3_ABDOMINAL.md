# Med Daddy v9.9.3 — Abdominal review and preserved-mock update

**Status: deployed study expansion; NOT yet certified against the complete five-questions-per-review-point editorial standard.**

## What is actually released

- Existing 80 independently authored Abdominal questions retained unchanged.
- 51 additional four-choice practice questions, each explicitly linked to one of the 51 numbered prompts in `PCT II: Abdominal Emergencies Review`.
- Current playable independent practice pool: **131 questions**. The 50-question standard practice, Quick 10, Daily up to 20 (wrong/unseen), and Full Bank 131 were exercised in a synthetic browser harness.
- Original `PCT II Abdo. mock.pdf`: **120 questions** preserved inside the Abdominal unit as a **separate unscored source archive**. Users may independently select A/B/C/D and manually reveal the key printed on the original PDF. Source keys are NOT treated as validated correctness judgments or added to the scored practice pool.
- Seventeen mock items are explicitly flagged for ambiguous/unverified clinical content or source defects: **26, 71, 74, 75, 77, 81, 82, 84, 87, 88, 89, 90, 98, 109, 111, 112, 120**.
- The original PDF visibly contains malformed option formatting at source mock #26; no missing alternative has been invented or silently scored.
- Expanded questions refer back to the uploaded 51-point review, assigned GI and trauma lectures, and appropriate BLS/ALS scope notes. The new questions do not add medication doses outside those already established in the uploaded material.

## Automated checks performed

- 51 unique new IDs, 51 four-option questions and 51 keyed correct responses; distribution A=12, B=14, C=15, D=10.
- All new items have a unique item ID, rationale for the correct response, tailored rationale for each of the other three choices, and review/source references.
- Potential first-line answer leakage and approximate duplicate-stem screening completed; this is not a guarantee of clinical correctness or an exhaustive similarity audit.
- The new script passed Node.js JavaScript syntax validation.
- In a simulated Chromium DOM with the original 80-item registry, the patch initialized successfully, opened 51, 50, 131, 10, and 20-question sessions, displayed 120 archived mock questions, showed 17 source flags, and left the supplied keys collapsed by default. No script exceptions were reported in that harness.
- No source question or historic score data was changed. A pre-update `v9.9.2_rollback_index.html` was committed.
- GitHub Pages build status is tracked separately; a complete live-site cross-device test is not yet certified.

## Outstanding standards gate

The prior Med Daddy target of five quality-checked questions for every review point means **255 review-point mappings**. One new question per prompt is now present, but the entire bank has not been reconciled point-by-point to certify five independent, high-quality tests for all 51 prompts. The 120 original mock items remain source archival material, not substitute audited questions. Until a full content crosswalk and clinician-level key audit are finished, do **not** mark this unit 'complete to standard' or claim that the preserved mock is a clinically verified test.

## Deployment

Standalone script: `md_v993_abdominal_review_mock.js` loaded after `md_v992_abdominal_hub.js` by root `index.html`. No changes were made to Endocrine, Urinary, Environmental, A&P units or Answer Lab.