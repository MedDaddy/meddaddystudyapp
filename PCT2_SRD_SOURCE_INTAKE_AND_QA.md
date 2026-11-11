# PCT II Symptom Relief Drugs — source intake and question-bank rules

**Status:** source audit / prebuild only; not live; no change to main.

## Verified uploaded materials
1. Instructor `PCT2_ Pharmacology Review.docx`: approximately 38 exam questions; calculation tools and pediatric weight estimate; six named priority drugs; eight priority medical directives; 25 instructor review questions.
2. `Symptom Relief ALS 5.3 Companion Guide 5.1 (1) (2).pptx`: 255 slides, labeled ALS 5.4 plus OBHG Companion 5.1; includes older content and multiple references to ALS 5.3. Use as teaching/clinical-context reference **only** after reconciliation against the uploaded official 2025 Ontario ALS PCS v5.4. Separate Core and AUX directives and track authorization.
3. `pct ii pharmo. mock(1).pdf`: original 350-question, 43-page mock with answer sheet on final page. Preserve source unmodified. Do **not** import keys blindly.
4. Previously uploaded `moh-advanced-life-support-als-patient-care-standards-pcs-5.4-en-2025-04-23.pdf` and `BLS-PCS-v3.4_Mar.-10-2023.pdf`; Chapter 7 Pharmacology lecture, EMS Pharmacology V2 E-Book, Nancy Caroline Canadian 8th edition.

## Instructor review exact exam focus
**Main meds:** ASA; nitroglycerin; epinephrine; salbutamol/Ventolin; dextrose; glucagon.

**Named directives:** Cardiac Ischemia; Bronchoconstriction; Nausea/Vomiting; Croup; Opioid Toxicity/Naloxone; Hypoglycemia; Seizure; Moderate to Severe Allergic Reaction.

**Other instructor review priorities:** antigen/anaphylaxis assessment; SGA insertion and follow-up; pediatric/adult medication doses; repeat-dose intervals; BGL values; mechanisms; ischemia assessment sequencing; IV/dextrose/glucagon; seizure and alcoholism; stroke versus ASA eligibility; wheezing anatomy.

## Original 350Q source mock audit findings
- Original answer-key positions: **A=19, B=249, C=79, D=3**, i.e. 71.14% B. Cannot import as-is; randomize actual answer choice order while retaining verified correct content.
- Q63 asks which route *completely bypasses* first pass, but lists both IV and sublingual; selection ambiguity due to wording. Require one defensible best key or quarantine.
- Q106 has malformed answer-choice text (B combines two responses and D is absent). Quarantine until manually reconstructed.
- Q259 embeds the worked **1.8 mL** calculation directly inside an incorrect 2.0 mL option; leaks correct answer. Remove leakage if used, verify drug scope.
- The mock contains math items using adenosine, amiodarone, dopamine and other medications outside typical PCP SRD treatment selection. Keep general arithmetic practice distinct from PCP directive treatment eligibility.

## Intended bank and audit specification
- Planned instructor-hard target **200 distinct, verified questions**, with **High-Yield 50** curated from the full bank, and a deduplicated approximately 38–50-item instructor-faithful mock. Do not create a 350-item active mock merely because source mock has 350.
- Target main categories: 50 dose/eligibility precision; 70 context-based best treatment decisions; 50 subtle contraindications; 30 sequence/reassessment/termination. Intersperse mathematical dosing problems within realistic scenarios.
- For **every directive medication question** independently verify from ALS 5.4: PCP authorization (Core/AUX), indication, condition, contraindication, age/weight cutoffs, available route/concentration, calculated dose, interval, maximum, reassessment, and patch requirements when applicable.
- Source-priority: official uploaded ALS 5.4 and BLS standards supersede older companion lecture claims; lecture highlights and instructor review set importance/coverage, but must not override current directives.
- Four plausible options, one unambiguous key, high clinical reasoning, no abstract filler, no answer leakage, no exact or conceptual duplicates, reasonable A/B/C/D distribution. Full source locator for each question and per-question QA record.
- Never inject ACP-only medical directive administrations into PCP scope. Separate generic med math from authorized PCP treatment.
- Do not edit Med Daddy live `main` or publish until question bank and UI launch tests pass. Commit audited release once after staging.

## Next QA gates
1. Create PCP v5.4 exact directive medication matrix with contraindications/doses; flag any 5.1/5.3 slide conflicts.
2. Fully reconcile mocked dose/contraindication items with ALS 5.4, source key and slides.
3. Author and verify all 200 questions and high-yield subset.
4. Stage on this development branch and run duplicate, key, source and 50-question navigation tests before publishing.
