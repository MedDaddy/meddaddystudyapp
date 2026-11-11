# Med Daddy v9.11.28 — SRD clarity and vertical clinical statements

Scope: PCT II → Symptom Relief Drugs only. No A&P or other PCT unit modified.

## Drug-specific wording
- PCT2-SRD-91123-129: replaces the vague “consider the alternative antiemetic” item with an explicit 60-kg, alert patient who received ondansetron 4 mg PO 30 minutes earlier without relief. Correct option: **dimenhydrinate 25 mg IM once**. All three wrong options now name drugs/doses and test repeat-dosing, unsupported oral route or unauthorized/undiluted IV administration. Verified with the uploaded Ontario ALS PCS v5.4 Nausea/Vomiting PCP Core Medical Directive, p.72.
- Correct-answer position and question ID are preserved. The source bank remains unchanged; audited override data and rationale live in the existing SRD continuity module.

## Presentation
- Keeps the full name of the PCP medical directive before each SRD question, but removes the redundant “Doses, administration and calculations” / other testing-focus preamble.
- Six active combination-selection SRD questions (one lettered A–D, five numbered 1–4) now display each statement on a separate line and separate the final question below the statements.
- Uses real newlines plus a targeted rendering observer, scoped to active SRD numbered questions only. No HTML inserted in question text.

## Technical audit
- 186 active SRD medication MCQs, unchanged IDs and answer positions except the intentionally corrected content of question 129.
- Launches: High-Yield 50, Instructor Mock 50, Dose 71, Contraindications 55, Treatment/Reassessment 60, Full 186, and mixed Directive Challenge 50; all pools have unique IDs and agree with the registered answer keys.
- 45 typed SRD dose/threshold questions remain in place.
- Source question #129 correct option and individual rationale checked; output verified against Ontario ALS PCS v5.4 p.72.
- All six targeted stacked prompts contain four independently separated statements. In a headless Chromium test, the four statement markers rendered at four different vertical positions when the observer applied the SRD-only pre-line style.
- Other unit files untouched. Tests are structural/simulated rather than a real-user browser session on the deployed site.

Release workflow: one production commit, with rollback branch retained. Educational use only; follow current and locally authorized PCP medical directives in actual practice.
