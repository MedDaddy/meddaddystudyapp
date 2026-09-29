# Med Daddy v8.6.0 - Question Bank Audit Report

Audit date: September 29, 2026  
Scope: every active question bank in Med Daddy v8.5.0

## Outcome

The active bank was reduced from **5,412 to 4,269 questions**. The reduction is intentional: **1,143 questions were removed** because they were invalid, duplicated, disclosed the answer, or repeated the same fact through low-value templates.

All 4,269 retained questions now have:

- four answer choices and one valid keyed answer;
- a unique question ID and unique normalized prompt;
- an original course/source field;
- an audit reference that points to the correct textbook, course files, or Ontario standard;
- no answer-revealing `clinical association` template;
- no generic `the tested concept points to...` distractor feedback;
- deterministic answer-position balancing.

## What was removed

| Reason | Removed |
|---|---:|
| Answer-revealing `clinical association` questions | 491 |
| Reverse-definition duplicates in the three newest PCT II banks | 491 |
| Exact duplicate prompts | 106 |
| Repetitive low-value psychology correction template | 49 |
| Answers explicitly disclosed in the stem | 5 |
| Invalid question schema | 1 |
| **Total** | **1,143** |

The reverse-definition questions were removed only where a stronger description-to-term question already tested the same fact. This retains topic coverage without counting one fact twice.

## Other repairs

- Removed boilerplate distractor feedback from **1,086 questions**. The correct explanation remains visible; misleading pseudo-explanations do not.
- Repaired missing course/unit metadata on **29 cardiovascular physiology questions**.
- Rebuilt Hardcore Final Exam A as **100 unique questions** selected from the retained A&P bank instead of storing duplicate copies.
- Rewrote the weak Ontario IM glucagon item as a patient case and verified the dosing logic against ALS PCS v5.4.
- Expanded short explanations for selected GCS, musculoskeletal, and cardiovascular questions.
- Balanced answer positions to A 1,079; B 1,069; C 1,065; D 1,056.

## Bank counts

| Course / bank | Before | After |
|---|---:|---:|
| A&P - Blood & Cardiovascular | 200 | 197 |
| A&P - Cardiovascular Physiology | 250* | 249 |
| A&P - Cells & Chemical Basis of Life | 200 | 199 |
| A&P - Chloe's Exam Review | 75 | 75 |
| A&P - Hardcore Final Exam A stored copies | 100 | 29** |
| A&P - Musculoskeletal | 200 | 197 |
| A&P - Respiratory | 200 | 181 |
| A&P - Skin & Integumentary | 200 | 193 |
| A&P II - Nervous System | 270 | 269 |
| Clinical Skills - GCS Case Studies | 60 | 60 |
| Fundamentals and Fundamentals II | 114 | 114 |
| PCT - Cardiac Mastery | 170 | 170 |
| PCT - Medical Terminology | 594 | 591 |
| PCT - Medication Drip Rates | 15 | 15 |
| PCT - Patient Assessment Mastery | 140 | 140 |
| PCT - Pharmacology Rapid Review | 171 | 171 |
| PCT - Respiratory Mastery | 185 | 185 |
| PCT - Shock | 116 | 116 |
| PCT II - ECG Interpretation | 188 | 188 |
| PCT II - Endocrine Emergencies | 604 | 232 |
| PCT II - Environmental Emergencies | 579 | 230 |
| PCT II - Neuro, Head/Face & Spine | 428 | 164 |
| Psychology - Midterm Prep | 232 | 183 |
| Shared CTAS and GCS | 61 | 61 |
| Standards - BLS & ALS Directives | 60 | 60 |

\* The original export contained 221 correctly labelled cardiovascular-physiology questions plus 29 unlabelled CVPHYS questions; the audit repaired those 29 records.  
\** The launchable final still contains 100 unique questions. Seventy-one are referenced directly from their retained A&P unit records instead of being duplicated in storage.

## Source hierarchy used

### Patient Care & Theory I and II

PCT theory was mapped to **Nancy Caroline's Emergency Care in the Streets, Canadian 8th edition**, plus every uploaded file relevant to the unit. Key chapter mapping:

- Pharmacology and medication administration: Chapters 7-8
- Patient assessment: Chapters 15-18
- Shock: Chapter 21
- Neuro/head/face/spine: Chapters 24, 25 and 31
- Respiratory: Chapters 13, 14 and 29
- Cardiovascular: Chapter 30
- Endocrine: Chapter 32
- Burns, toxicology and environmental emergencies: Chapters 23, 36 and 38

### Anatomy & Physiology I and II

A&P was mapped to **Patton, Anatomy & Physiology, 11th edition**, plus the uploaded slides, review sheets, objectives and practice material:

- Cells and chemistry: Chapters 3-7
- Skin: Chapter 10
- Musculoskeletal: Chapters 11-17
- Nervous system: Chapters 18-24
- Blood and cardiovascular: Chapters 27-30
- Respiratory: Chapters 35-37

### Ontario care and directives

Questions involving field care, scope, medications or medical directives were checked against:

- Ontario Basic Life Support Patient Care Standards, version 3.4
- Ontario Advanced Life Support Patient Care Standards, version 5.4
- ALS PCS v5.4 Companion Document where explanatory guidance was relevant

Textbook treatment language was not allowed to override a current Ontario directive or BLS standard.

### Other modules

- Psychology and Fundamentals were mapped to the complete uploaded slide/handout sets for those modules.
- ECG questions remain tied to the uploaded ECG decks, self-study package and authentic tracing set.
- CTAS remains tied to the Ontario adult prehospital CTAS material.
- GCS remains tied to structured component scoring and records untestable components as NT rather than assigning an artificial score of 1.

## Automated QA results

| Check | Result |
|---|---:|
| Active questions | 4,269 |
| Invalid schemas | 0 |
| Duplicate IDs | 0 |
| Duplicate normalized prompts | 0 |
| Answer-revealing association templates | 0 |
| Reverse-definition duplicates in newest PCT II banks | 0 |
| Generic distractor rationale templates | 0 |
| Questions missing original source metadata | 0 |
| Questions missing audit reference | 0 |
| Launchable A&P cumulative exam | 100 unique questions |
| Inline JavaScript execution failures | 0 |

## Quality rule going forward

New banks should not be expanded by automatically asking the same fact in three superficial forms. A question earns its place when it adds at least one of the following:

1. distinct required knowledge;
2. application to a patient presentation;
3. discrimination between plausible alternatives;
4. calculation or structured scoring;
5. Ontario directive or BLS decision-making;
6. a review-sheet or learning-objective point not already covered.

Question count is now a consequence of coverage, not the target.
