# Med Daddy v9.8.8 — Endocrine Treatment Sequence Challenge

**Added:** 21 new difficult PCP management-sequence scenarios in a separate Endocrine practice pool. This is an additive release; it does not replace v9.8.6's original 21 clinical scenarios, the Endocrine focused 90, instructor-review material, or the preserved Discord source mock.

## Changes

- New **Treatment Sequence Challenge · 21 cases** card under PCT II → Endocrine Emergencies, with **Quick 10** and **Study all 21** launchers.
- New **Treatment sequences · 21** option in the existing source-selection dropdown. A requested 50 or “All available” starts the entire 21-question pool, with the actual count reported; 10 starts 10.
- Each new case includes multi-action management-plan choices, evolving assessment and vital-sign information, correct rationale, *distinct* reasons each of the other three plans is less appropriate, source-specific slide locators, instructor review points, and applicable Ontario PCS references.
- All new questions are **explicitly validated and registered** with the same question-safety registry used by v9.8.7 **before** the launch controls are enabled. This addresses the prior zero-question launch problem without disabling that safeguard.
- Added an independent offline 21-question study page showing the rationale and source information after answering.
- Version label updated to v9.8.8; v9.8.7 entrypoint retained as `v9.8.7_rollback_index.html`.

## Primary sources used

- Uploaded **Endocrine Emergencies, Chapter 32** instructor deck, revised May 12, 2026, 105 slides.
- Uploaded **Endocrine test review**, 22 questions.
- Uploaded **Ontario Advanced Life Support Patient Care Standards, v5.4**, PCP Hypoglycemia Medical Directive pp. 56–60; Opioid Toxicity/Withdrawal pp. 61–64 where relevant; Suspected Adrenal Crisis pp. 65–66.
- Uploaded **Ontario Basic Life Support Patient Care Standards, v3.4**, including Patient Assessment, Patient Management, Patient Refusal/Emergency Treatment, Stroke, Respiratory Failure and Load and Go.

**Scope distinction:** All clinical care actions are educational vignettes. The lecture source is primary for presented conditions, while the uploaded official PCS texts control medication/transport criteria where the slides simplify or differ. This release is *not* independent validation against the full unprovided textbook. Always follow current authorization and full standards in actual care.

## Verification

- 21 unique question IDs; 4 answer choices per case; exactly one keyed best plan; 3 individual distractor rationales per case; case/rationale/source metadata; answer letters B 6, A 5, C 5, D 5.
- Explicit source verification for dextrose dosing (2 mL/kg D10 and 25 g cap), IM glucagon age/weight restrictions, glucagon contraindication with pheochromocytoma, Treat-and-Discharge exclusions, hydrocortisone 2 mg/kg rounded to 10 mg with 100 mg cap and single dose, and treatment-vs-refusal distinctions from the uploaded standards.
- Browser regression with canonical question registry wrappers: **21/21**, **10/10**, source-dropdown **21/21** and **10/10**, and original v9.8.6 **21/21**.
- Standalone browser validation: question rendering, answer selection, feedback, source citation, next-question navigation.
- JavaScript syntax check passed; no reported page-script errors in isolated tests.
- **Limitation:** The entire large published Med Daddy app cannot be reliably launched in the test container's direct-file browser environment. The main-site live-browser smoke test remains for users after GitHub Pages deployment.

## Preserved

- Prior focused Endocrine 90; 21 prior scenarios; instructor review / slide prompts / terminology; High-Yield 50; preserved Discord mock and its source answer key; Urinary and all other units.
- Medication directive source data, doses, original course sets, saved progress, and localStorage key names.
- v9.8.7 rollback entrypoint.