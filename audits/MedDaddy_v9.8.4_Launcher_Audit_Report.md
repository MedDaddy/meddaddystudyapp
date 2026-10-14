# Med Daddy v9.8.4 — Launcher / Deck Size Audit

**Release:** 2026-10-14  
**Scope:** Launcher routing and question-deck counts. *Not a clinical content audit.*  
**Verified:** 178 actual launch invocations across course panels, unit pages, source-specific drills, and saved-question modules (some aliases to the same function). The browser tests used the current v9.8.0 base with the v9.8.2, v9.8.3 and v9.8.4 release scripts applied in order. None of these tests submitted answers or altered a live user's progress.

## Cause and fix

- **Fault replicated:** Main PCT II Endocrine `50-Question Mock` launched only **2** questions because a v9.1.1 override still filtered by an old `MD_ADVANCED_IDS` subset, which no longer matched the curated Endocrine bank.
- **Now corrected:** Main PCT II Endocrine focused practice loads **50 from the live 90-question bank**, including checks that the bank is actually 90. A separate explicitly labelled **Preserved Discord mock · 50** launches 50 from the original source PDF. In a direct user-interface click test, each button opened **Question 1 / 50**.
- **Topic controls repaired:** Endocrine topics use the active curated 90 and now launch correctly: Foundations + Glands 21, Diabetes 15, Hypoglycemia 16, DKA/HHS 15, Adrenal 12, Thyroid 9, Integration 2; Diabetic Emergencies combined 31. The directive/medication drill opens 27. Old 30-question Endocrine launcher now opens 30.
- **Truthful labels:** Neuro complete challenge now advertises **82** instead of 100; Head 21, Spine 19 and Medical 42 are labelled accordingly. Psychology's visible full-bank label now says **183** (instead of legacy 232), and four topic-size labels are corrected. Fundamentals driving/operations launcher notes 21 questions available rather than implicitly promising 30.

## Representative deck-size checks

| Section / launcher | Verified loaded |
|---|---:|
| Endocrine focused 50 | 50 |
| Endocrine focused full | 90 |
| Endocrine daily review | 20 |
| Endocrine source: instructor review | 110 (source launcher verified in prior v9.8.3 tests) |
| Endocrine source: slide prompts | 18 (source launcher verified in prior v9.8.3 tests) |
| Endocrine source: terminology | 51 (source launcher verified in prior v9.8.3 tests) |
| Endocrine High-Yield | 50 (source launcher verified in prior v9.8.3 tests) |
| Endocrine preserved Discord mock, selected | 50 |
| Endocrine preserved Discord mock, scorable full | 199 (one flagged source item omitted) |
| Neuro focused challenge — whole curated bank | 82 |
| Neuro preserved source mock | 120 |
| Environmental general practice | 50 |
| Environmental full coverage | 458 |
| Environmental preserved clean/highlighted mock | 120 each |
| Urinary normal complete | 260 |
| Urinary High-Yield complete | 100 |
| Urinary source mock scored | 149 (the 150th is an invalid source-key item) |
| Infectious normal complete | 360 |
| Infectious High-Yield complete | 100 |
| A&P I full mastery | 501 |
| A&P II Nervous full | 160 |
| A&P II Digestion full | 220 |
| ECG complete | 188 |
| GCS case study complete | 60 |
| Psychology midterm sourced normal bank | 183 |

## Count mismatches discovered before correction

Some mismatches arose because a topic really contains fewer than the maximum number requested. These are **not missing questions**: the button previously showed a proposed session size rather than available source count. All source pools were preserved.

- Route 93: **pct2NeuroPage** / “100-question challenge” claimed [100] but loaded **82**.
- Route 95: **pct2NeuroPage** / “50 questions” claimed [50] but loaded **21**.
- Route 96: **pct2NeuroPage** / “50 questions” claimed [50] but loaded **19**.
- Route 97: **pct2NeuroPage** / “50 questions” claimed [50] but loaded **42**.
- Route 148: **psychMidtermPage** / “Complete 232-question mastery” claimed [232] but loaded **183**.

## Changes / safeguards

1. Corrected the old PCT II Endocrine launcher and individual topic filters to use the actual 90-question Endocrine focused bank, with a hard count guard on the bank size.
2. Created an explicit preserved Discord 50-question launcher beside the ordinary focused-practice control. Original mock wording and supplied key remain unchanged.
3. Preserved the existing High-Yield, 110 review, 18 slide, 51 terminology, mixed, and 199-scorable mock launchers under the unit menu.
4. Updated the Neuro and Psychology *display labels* to match the live available counts instead of faking additional questions.
5. Added a transparent Fundamentals driving/operations availability note and updated the displayed version to v9.8.4.
6. Preserved the GitHub previous-release entrypoint for immediate rollback. **No medical directive doses, question stems/answers, mock provenance, or saved-progress keys were changed.**

## Boundaries / follow-up

- This audit is about launching existing question sets. It does not independently validate the clinical accuracy or source traceability of each question, nor does it certify all raw source mock keys.
- A few exam-size requests intentionally cap at their real topic pool, such as A&P II Autonomic (9), ECG Chest Leads (6), and Psychology Behavioural Emergencies (13); these are topic drills, not promises of full 20/30/50 sets.
- The code-level Chromium checks cannot substitute for a live Mac Safari or personal browser test. After deployment, test PCT II Endocrine focused 50, Discord 50, and the other affected topic shortcuts.

**Supporting data:** `MedDaddy_v9.8.4_Launcher_Audit_178_Routes.csv` lists each button, handler, loaded count, and any runtime error.