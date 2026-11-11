# Med Daddy v9.11.23 — PCT II Symptom Relief Drugs release QA

**Staged release:** v9.11.23. Source branch: `work/pct2-srd-directive-audit`. Official reference: uploaded Ontario ALS PCS v5.4 (April 2025), PCP Core and PCP Auxiliary sections, BLS PCS v3.4, instructor pharmacology review, companion slides and original 350Q source mock.

## Authored content and deck accounting
- 200 individually authored, distinct four-choice clinical questions: 72 dose/math, 60 contraindication/eligibility, 46 best-treatment choices, 22 reassessment/sequence.
- High-Yield 50 (ten concept families with five items each): A=13/B=12/C=12/D=13.
- Instructor-style 50-question mock, curated from the authored bank and **not** imported verbatim from the unverified 350Q original: A=13/B=12/C=13/D=12.
- Dose/math 72; contraindication scenarios 60; treatment and reassessment 68; complete source-linked bank 200.
- Across all 200 unique items: answer A50/B50/C50/D50. Answer content moves with the correct option, rather than relabeling incorrect keys.
- Eight questions use controlled numbered-combination or Both-A-and-B reasoning. One unambiguous correct combination per question.
- Each question has a clinical rationale and ALS or instructor source locator. Deliberately **no generic wrong-answer rationale**.
- Existing historical original `pct ii pharmo. mock(1).pdf` remains in the user's uploaded-file library. Its complete text extraction and answer sheet are archived on this branch in `PCT2_SRD_ORIGINAL_350Q_MOCK_UNVERIFIED.txt`, not used as an authority.

## Original mock exclusions and defects
- Original 350-answer sheet: A=19, B=249, C=79, D=3; unacceptable option-position bias.
- Original Q63: multiple plausible answers for complete first-pass avoidance; original Q106: malformed option list; original Q259: answer math included in a distractor.
- Source mock includes medication math outside PCP SRD clinical authorization; medication dosing/scope must be checked independently before any future playable import.

## Directive dose and contraindication matrix (Ontario ALS PCS v5.4)
- **Cardiac Ischemia, pp.51–53:** ASA 160–162 mg PO once if ≥18, unaltered and able to chew/swallow; contraindications include recent CVA/TBI ≤24h, current active bleeding, NSAID sensitivity, asthmatic with no prior ASA use. Nitroglycerin 0.3/0.4 mg SL q5min up to six non-STEMI or three STEMI doses; HR 60–159, SBP ≥100 and normotension, and prior nitrate history or authorized IV access. PDE inhibitor within 48h, RV STEMI and ≥one-third post-dose SBP decrease prohibit nitrates.
- **Bronchoconstriction, pp.24–27:** salbutamol MDI up to 6 puffs/600 mcg <25kg or 8 puffs/800 mcg ≥25kg; NEB 2.5mg <25kg or 5mg ≥25kg; q5–15min PRN up to 3 doses. Nebulization contraindicated with suspected/known fever or declared febrile respiratory illness outbreak. IM epinephrine 0.01mg/kg max 0.5mg once when history asthma and BVM required. Dexamethasone 0.5mg/kg max 8mg once if qualified, not currently taking PO/parenteral steroid.
- **Moderate/severe allergic reaction, pp.28–29:** anaphylaxis IM epinephrine 0.01mg/kg max 0.5mg, minimum 5min apart and max 2 doses. Diphenhydramine ≥25kg: 25mg at 25–<50kg, 50mg at ≥50kg, once IV (autonomous authorization) or IM. Epi before IV access.
- **Croup, pp.30–31:** age ≥6 months and <8 years; epinephrine NEB 2.5mg <10kg / 5mg ≥10kg once if stridor at rest and HR <200; dexamethasone PO 0.5mg/kg max 8mg once if unaltered LOA, no steroid in previous 48h, able PO.
- **Hypoglycemia, pp.56–60:** dextrose IV ≥2y altered LOA: D10 0.2g/kg or 2mL/kg (max 25g/250mL) or D50 0.5g/kg or 1mL/kg (max 25g/50mL); ten-min intervals max two, titrated to safe oral carb intake. Glucagon IM <25kg 0.5mg / ≥25kg 1mg, IN 3mg age ≥4y; q20min max two. Pheochromocytoma excludes glucagon; IV only with PCP Autonomous IV. Treat-and-discharge has strict criteria incl 18–<65y, no preceding seizure, no alcohol/substance association, no oral hypoglycemic drugs, BGL ≥4 and caregiver for four hours.
- **Opioid toxicity, pp.61–64:** inadequate ventilation and RR <10; naloxone up to 0.4mg IV, 0.4mg IM, 2–4mg IN, 0.8mg SC, q5min max 3; airway/ventilation prioritized, titrate to breathing not GCS15. Buprenorphine/naloxone if authorized, age ≥16, after naloxone and COWS ≥8, no methadone past 72h: 16mg then 8mg q10min, cumulative max 24mg.
- **Analgesia, pp.67–70:** age ≥12, unaltered; acetaminophen 500–650mg PO 12–<18 or 960–1000mg PO ≥18, once; ibuprofen 400mg PO once; ketorolac 10–15mg IM/authorized IV once. NSAID restrictions include anticoagulants, active bleeding, recent NSAID (6h), ulcer/GI bleed, pregnancy, recent CVA/TBI, renal impairment, suspected ischemia. Acetaminophen excludes use in previous four hours and liver disease.
- **Nausea/Vomiting, pp.71–72:** weight ≥25kg and unaltered: ondansetron 4mg once PO or authorized parenteral route; excludes known long-QT syndrome and apomorphine. Dimenhydrinate 25mg at 25–<50kg; ≥50kg 25 or 50mg with 30min repeat up to 50mg cumulative; excludes diphenhydramine coadministration and specified drug overdose. Age ≥65 is **not an absolute contraindication** in ALS 5.4; if ondansetron unavailable assess risks/benefits, possibly initial 25mg.
- **ACPE pp.54–55:** nitro 0.3/0.4mg SL when 100≤SBP<140 (regardless of IV/Hx); higher ≥140 branch with prior nitro or IV allows 0.6/0.8mg SL; q5min max six; HR60–159, no PDE inhibitor in 48h and stop for ≥one-third pressure fall.
- **Adrenal crisis pp.65–66:** primary adrenal failure and personal hydrocortisone vial supplied with qualifying symptoms; 2mg/kg IM/authorized IV, rounded to nearest 10mg, max 100mg once.
- **SGA pp.22–23:** other airway methods ineffective, need ventilatory assistance/airway control, absent gag, no listed contraindications; max 2 insertions; waveform ETCO2 primary confirmation, or at least two secondary methods if unavailable.
- **Seizure AUX pp.192–193:** only authorized treat-and-discharge, not an invitation to import ACP anticonvulsant administration. Requires established epilepsy and compliance, single typical seizure and normal temperature, and excludes alcohol/withdrawal, seizure-related injury, pregnancy, paramedic midazolam, new fever/illness or medication changes.

## Reconciliation of legacy teaching companions
The uploaded mixed-version companion slides are explanatory material. When the slide wording differs from the official ALS PCS v5.4—for example absolute age 65 antiemetic limits, old preeclampsia or earlier drug caps—the official uploaded ALS 5.4 medication directive controls questions and correct answers. Do not silently treat non-PCP or AUX-only procedures as Core.

## Technical QA
- Four source files `md_v91123_srd_raw_{a,b,c,d}.js`, followed by `md_v91123_srd_hub.js`, loaded in order after other existing unit modules.
- All 200 prompts unique after normalization; all choices distinct; four options each; every correct answer matches the shuffled content (not just a letter).
- Six launch modes tested using a stubbed DOM and original quiz launch contract: high50, mock50, dose72, contraindication60, treatment68 and complete200. Registry IDs/answers remain consistent.
- App route through existing `pct2InfectiousPage` and home-menu anchor `pct2UnitSix` tested by DOM stub; no overwrite of existing unit content.
- `index.html` release marker v9.11.23 and one script inclusion per new source file; JavaScript syntax compilation passed.
- A real interactive browser device test remains recommended after the Pages build. No user progress or older mocks intentionally modified.
- Original source and rollback: `work/pct2-srd-directive-audit` contains the staged history; main receives one squash commit after QA.

**Education use only**: students and practicing paramedics must use the current provincially approved/local base-hospital-authorized directives at point of care.
