# Med Daddy v9.11.25 — PCT II SRD contextual continuity and drug-only scope audit

## Trigger
Student review identified an inferior STEMI/V4R case that asked “What is correct?” without naming the medication under consideration; the 0.3-mg SL option also omitted “nitroglycerin.” A nausea/vomiting eligibility case did not introduce the two antiemetics despite asking about “both.” A separate question tested supraglottic-airway insertion, which is not a Symptom Relief Drugs medication question.

## Repairs
- **25 existing SRD clinical stems rewritten** to establish one clear exam task: (a) select the appropriate drug, (b) consider a specifically named drug and its dose/contraindication, or (c) select between treatments or treatment-and-dose plans based on supplied assessment findings.
- Corrected the ambiguous sublingual 0.3-mg distractor to explicitly identify nitroglycerin. No correct-answer key was changed.
- Original source-bank files remain unchanged; amendments are stored in `md_v91125_srd_continuity.js` and applied at initial registration before the study engine. Existing item IDs remain stable.
- **Removed 14 non-medication questions from all active SRD practice pools:** six SGA device/insertion questions, six PCP Seizure Treat-and-Discharge disposition questions and two stand-alone cardiac ECG logistics questions. All 14 remain in the archived original 200-question raw source bank for future reassignment.
- Removed one SGA and one seizure-disposition fill-in item from active typed practice; the original 47-question source remains unchanged.

## Effective SRD scope
- 186 medication-relevant active MCQs: 71 dose/math, 55 eligibility and contraindication, 60 best treatment/reassessment.
- High-Yield 50 and Instructor Mock 50 retained; both produce 50 unique questions with balanced positions:
  - High-Yield A13/B12/C12/D13.
  - Mock A13/B12/C13/D12.
- Dedicated PCP Directive Challenge: 50 unique questions across 10 named medication directive categories.
- Named Cardiac Ischemia practice: 22 questions, without the two pure ECG-logistics entries.
- Fill-in-the-Blank: 45 numerical drug dose/interval/threshold items, immediate grading and missed-only review.
- The original 350Q instructor source mock remains separately archived and unmodified.

## Clinical continuity examples
- **PCT2-SRD-91123-010**: the question now explicitly establishes that the clinician is considering **sublingual nitroglycerin** for a 64-year-old with inferior STEMI, 2-mm ST elevation in V4R, SBP 150. One wrong option now explicitly says “0.3 mg nitroglycerin SL.” The correct response remains to withhold nitroglycerin for RV STEMI.
- **PCT2-SRD-91123-128**: the stem now explicitly identifies **ondansetron and dimenhydrinate** under the Nausea/Vomiting directive before asking for their common eligibility condition.
- **PCT2-SRD-91123-164**: the dose question now identifies **hydrocortisone** and the rounding convention.
- **PCT2-SRD-91123-195**: the post-TBI scenario now asks which **NSAID and antiemetic selection plan** fits the directives.
- **PCT2-SRD-91123-199**: the ischemia case explicitly establishes that **ASA versus nitroglycerin** decisions are being assessed.

## Automated regression checks on development branch
- SRD source bank 200 original IDs/choices retained, with 25 stem corrections applied at runtime.
- 186 registered live SRD questions; no SGA, seizure-disposition or pure ECG-logistics IDs are registered.
- Six original launch modes: 50, 75 and complete186; High-Yield50; Mock50; Dose71; Contra55; Treatment60 — all simulated with unique IDs.
- Dedicated directive challenge50 and focused Cardiac Ischemia22 tested; no excluded IDs.
- 45 typed questions exercised end-to-end: 44 correct and one intentional error → 44/45 score and missed-only review.
- All MCQ answer keys checked against the unchanged safe registry; no question duplication in active pools.
- No other A&P or PCT unit sources or UI altered.
- These are **DOM-simulated interaction tests**. Final user-browser review remains needed following Pages deployment.

## Publishing
Stage branch: `work/srd-v9.11.25-context-and-scope`. Publish with a single squashed commit and preserve a rollback branch. Official uploaded Ontario ALS PCS v5.4 is the source of dosing and contraindication statements; questions are educational and depend on current/local PCP medical authorization.
