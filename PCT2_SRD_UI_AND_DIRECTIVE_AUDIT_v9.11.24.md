# Med Daddy v9.11.24 — SRD-only directive challenge, full-sized tiles, fill-in-the-blank

## User-requested changes
- **Every SRD MCQ** now begins with the **full named PCP directive** (or explicitly identified pharmacology review / integrated directives) and a short description of what is being tested: dose, contraindication, treatment choice, or sequence. No unidentified directive numbers are used as the question context.
- **Large clickable tiles** return inside **PCT II → Symptom Relief Drugs** only: PCP Directive Challenge; 47 typed fill-in-the-blank; High-Yield 50; Instructor-Style Mock 50; Dose & Medication Math; Contraindication Traps; Treatment & Reassessment; Full SRD 200.
- **Session-length chooser preserved:** 50, 75, 100, or full selected MCQ deck. High-Yield and mock cap at their actual 50 distinct items.
- **PCP Directive Challenge** uses a 50-question round-robin across 12 specifically named PCP directive pools (including Seizure — PCP Auxiliary); no duplicates.
- **Choose one specific directive**: shows the full actual directive name and exact number of questions in the selected pool, with no fabricated repeats.
- **Fill in the Blank**: 47 source-linked numerical calculations, doses, intervals, weight cutoffs and therapy thresholds. Unit given in prompt, student enters numeric value; feedback immediately supplies explanation and ALS citation, scoring and missed-only re-test after completion. Tracks aggregate typed practice in a separate local storage key.

## Preserved and unchanged
- All 200 existing SRD MCQ IDs, choices, answer keys and underlying source bank files remain unchanged.
- The source 350-question uploaded mock remains preserved separately. No blind import or repackaging of its original answer sheet.
- No changes to any other PCT or A&P unit scripts, menus, banks or learning progress keys.
- Changes consist only of the index.html release/version loader plus new SRD-only CSS, UI JavaScript and typed bank data.

## Simulated launch and interaction audit
- v9.11.24 SRD UI readiness: true; all 200 MCQs given named directive and objective context.
- Eight SRD tiles present; 12 named PCP directive pools.
- 50Q mixed directive challenge: **50/50 unique**, 12 directive subjects, balanced sample A12/B12/C14/D12.
- 25Q selected Hypoglycemia directive: 25 unique, all from one named directive.
- Standard SRD 50Q/75Q/full200 launch: correct counts and distinct IDs.
- End-to-end 47-item fill-in-the-blank simulation: 46 correct, one intentionally wrong; shows 46/47 score and missed-only action. Both correct and incorrect feedback tested.
- Single-script syntax checks passed; index adds exactly one copy of each new JavaScript file, in order (typed data before UI); version is v9.11.24.
- These are **simulated DOM tests**, not a real-device browser certification. A hands-on test after GitHub Pages deployment remains appropriate.

## Source priority
The numerical practice uses the user's official uploaded Ontario ALS PCS v5.4 PCP directives (2025), with the instructor's PCT II Pharmacology Review defining emphasis. In case of any inconsistency with older ALS 5.1/5.3 companion slides, the official uploaded ALS 5.4 controls. Follow local authorization requirements for IV therapy and PCP auxiliary directives; educational use only.

## Deployment
- Work branch: `work/srd-v9.11.24-directive-tiles-fill`.
- Publish in **one squashed commit to main**, preserving a rollback branch.
