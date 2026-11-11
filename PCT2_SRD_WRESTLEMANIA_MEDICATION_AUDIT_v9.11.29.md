# Med Daddy v9.11.29 — SRD WrestleMania Medication Mayhem audit

**Scope:** PCT II > Symptom Relief Drugs only. New content and any patched legacy questions are tested against the user-uploaded Ontario ALS PCS v5.4 PCP Core medical directives. Instructor mock source stays archived and unchanged.

## Learning goals implemented
- Focus SRD on which medication, the authorized dose, route, medication sequence, repeat interval, contraindications and maximum dose.
- Remove answer-giving question wording and obviously unrelated distractors. Patient scenarios provide the facts; answer choices should require applying a directive.
- Add occasional memorable ringside, stage-fog, costume-allergy, wrestling-injury and arena-spectator emergencies without inventing new drug authority.
- Preserve the full named medical directive ahead of the question but do not display redundant "testing category" heading.
- Continue vertically stacked numbered-combination MCQs.

## Bank and identity accounting
- **216 active medication-specific MCQs:** 186 existing active cases (unchanged IDs) plus 30 new WrestleMania directive medication cases (new `PCT2-SRD-91129-*` IDs).
- **20 existing items rewritten** through data-only medication override file; current original keys retained in their respective ID and letter position. Corrected former non-drug/obvious selections (airway as answer, pure glucometry, pack-year-only calculations, generic IV kinetics) and replaced them with dose, route, drug-order and drug-specific math questions.
- **WrestleMania Medication Mayhem 50:** all 30 new cases and 20 curated high-difficulty existing medication cases; A13/B12/C13/D12, no duplicates.
- Existing High-Yield50 and Instructor Mock50 remain balanced (A13/B12/C12/D13 and A13/B12/C13/D12 respectively). They use the expanded source pool, not new duplicate source questions.
- Other live SRD study pools: dose/math80; contraindication65; best-treatment/reassessment71; mixed PCP Directive Challenge50; complete216; selected named directive banks across ten medication directives.
- **100 fill-in-the-blanks:** 45 existing medication-only numerical questions and 55 new items, of which 43 require exact numeric doses/volumes/intervals and 12 require the medication name (aliases such as ASA/aspirin, acetaminophen/Tylenol and buprenorphine/naloxone/Suboxone supported). No drug name is given away in the name-recall stem.
- Original 200-item raw SRD source remains preserved, including its 14 excluded non-medication SGA, seizure-disposition and ECG-logistics cases; original 350-question instructor mock remains unchanged.

## Source-verified examples
- Cardiac ischemia: ASA 160–162 mg PO once, nitroglycerin 0.3 or 0.4 mg SL q5 min up to six non-STEMI or three STEMI doses; RV STEMI, PDE inhibitor exposure within 48 hours, or pressure drop ≥1/3 exclude nitrates (pp.51–53).
- Bronchoconstriction: salbutamol weight-banded MDI/NEB, IM epinephrine 0.01 mg/kg max 0.5 mg only with asthma history and BVM required; epinephrine first if apneic, and no nebulization with fever/declared outbreak (pp.24–27).
- Allergic reaction: IM epinephrine 0.01 mg/kg max 0.5 mg q≥5 min, maximum two, given before IV access; diphenhydramine 25 mg at 25–<50 kg or 50 mg at ≥50 kg (pp.28–29).
- Croup: age ≥6 mo to <8 yr; NEB epinephrine 2.5 mg <10 kg / 5 mg ≥10 kg if stridor at rest and HR <200; dexamethasone 0.5 mg/kg PO max 8 mg once when eligible (pp.30–31).
- Hypoglycemia: IV D10 2 mL/kg to 250 mL or D50 1 mL/kg to 50 mL, only with autonomous IV authorization; IM glucagon 0.5 mg <25 kg / 1 mg ≥25 kg; IN 3 mg age ≥4, with pheochromocytoma restriction (pp.56–58).
- Opioid toxicity/withdrawal: naloxone 0.4 mg IM q5 min up to three, with ventilation clinically prioritized; authorized buprenorphine/naloxone BUC/SL after naloxone and COWS≥8, 16 mg then 8 mg after ten minutes, maximum 24 mg, no methadone in 72h (pp.61–64).
- Analgesia: adult acetaminophen 960–1,000 mg PO once; ibuprofen 400 mg PO once; ketorolac 10–15 mg IM/authorized IV once; separate NSAID and acetaminophen contraindications (pp.67–70).
- Nausea/vomiting: ondansetron 4 mg PO/authorized parenteral once; dimenhydrinate 25–50 mg IV/IM per weight, 30-minute alternative or repeat conditions; IV only if authorized, 1:9 dilution (pp.71–72).
- ACPE: pressure-banded SL nitroglycerin 0.3/0.4 vs 0.6/0.8 mg, q5 min up to six, high-SBP higher-dose branch requires IV/prior nitrate history (pp.54–55).
- Adrenal crisis: patient-specific vial, 2 mg/kg hydrocortisone rounded to nearest 10 mg, max 100 mg IM/authorized IV (pp.65–66).

## Automated regression audit on branch
- All 216 MCQ stems unique after normalization; no exact keyed correct-option text copied into a question stem (where a long exact phrase would reveal it). All options have four distinct choices with a valid, source-explained correct key.
- All 100 typed prompts unique after normalization; 12 medication-name prompts inspected for accidental drug-name leakage; no leakage found.
- Study launch simulation passed for WrestleMania50, High-Yield50, Mock50, dose80, contraindications65, treatment71, full216, individual directive, and full50/75/100 subsets; every session has unique IDs and correct registry answer mappings.
- Typed session simulation: 99/100 with one intentionally wrong answer; medication aliases and leading-decimal numeric answers accepted, missed-only restart launched a one-question session.
- One script inclusion each for the three new SRD assets, with correct load order; no changes to A&P, other PCT modules or persistent study-progress ID keys.
- The simulated test environment does not replace hands-on browser testing after GitHub Pages deploy.

**Release:** v9.11.29. Production should receive a single squash commit, preserving previous v9.11.28 as rollback. Clinical use always requires current locally authorized PCP directives.
