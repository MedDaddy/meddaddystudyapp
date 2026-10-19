# Med Daddy v9.8.9 — PCT II Endocrine: Hard Review 42

## User-requested change
Publish the 42-question instructor-level practice set made from the uploaded three-page **PCT 2: Endocrine Review** as an additional study deck in the existing Endocrine unit. These are newly authored practice questions, **not** the preserved Discord mock.

## Alterations
1. New independent **Hard Review Challenge · 42 questions** card in `PCT II → Endocrine Emergencies → Choose your study session` with **Quick 10**, **Standard 30**, and **Full 42** launch buttons.
2. New **Uploaded review challenge · 42** choice in the existing source-selection dropdown. A request for 50 in this pool transparently opens all 42 available; it does not claim to deliver 50 unique questions.
3. Added 42 new, unique `PCT2-ER-HARD-001` through `PCT2-ER-HARD-042` questions with four answer options, a best key, correct explanation, each wrong-option rationale, and source pointers back to the uploaded review and the 105-slide Endocrine lecture. Directive-linked content is framed under the uploaded Ontario ALS PCS v5.4 / BLS PCS v3.4 material.
4. Registered all 42 new IDs with the **existing protected question registry** after validating the answer-leak rules, keys, rationale completeness, IDs, and references. Fails closed if prereqs or registry checks fail.
5. Version label advanced to **v9.8.9**. v9.8.8's entrypoint preserved as `v9.8.8_rollback_index.html`.

## Preserved / explicitly NOT changed
- Focused Endocrine 90; original Scenario Challenge 21; Treatment Sequence Challenge 21; original review, slide, terms and high-yield study banks; preserved original Discord mock and its answer keys.
- A&P Urinary, other courses, medical directives, study progress/statistics/localStorage keys, and existing app navigation other than the additive card and source entry.
- No changes to any stored responses or marks. New question IDs do not overwrite existing ones.

## Source and quality boundaries
- **Primary source:** uploaded `PCT 2: Endocrine Review.pdf` (10 definitions, two directive focus areas, 31 numbered prompts).
- **Cross-reference:** uploaded 105-slide `Endocrine Emergencies`, Chapter 32 lecture.
- **Treatment requirements:** uploaded Ontario ALS PCS v5.4, BLS PCS v3.4; official medical-directive text overrides simplified/historical slide examples where the two conflict.
- **Not asserted:** a word-for-word textbook crosswalk or faculty certification of all answer keys. This is instructor-level study practice, not field authorization.

## Validation
- Parsed and checked 42 unique IDs; all 42 have four options, one A-D key, individual rationales for all three incorrect choices, and cited lecture/review pointers.
- Ran the actual Med Daddy answer-leak validator against every new case: **0 rejected**.
- Isolated real Chromium browser regression: **Quick 10 → 10; Standard 30 → 30; Full 42 → 42**, source selector `10 → 10`, `30 → 30`, `50 → 42`, `All → 42`. Established source-selector controls still forward when the new source is not selected.
- Tested that the new launchers uncheck the previous adaptive/recycle filters before starting and register question IDs with the existing safe-question Map.
- Public GitHub Pages workflow confirmation is recorded separately. The oversized full site has not undergone a new complete live end-to-end browser pass; users should flag anomalies in the live app.