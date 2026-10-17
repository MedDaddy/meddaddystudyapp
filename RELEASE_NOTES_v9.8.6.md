# Med Daddy v9.8.6 — Endocrine Scenario Challenge
Release date: 2026-10-17
## Added
- 21 newly authored, instructor-level clinical vignettes in one additional Endocrine source deck.
- All 21 or Quick 10 launchers on the existing Endocrine study menu.
- A selectable new source option, supporting the existing 10/20/30/50/all controls; 50 is capped truthfully at 21 available.
- Questions cite Chapter 32 slide ranges, instructor review question numbers, BLS PCS 3.4 and ALS PCS 5.4 where applicable.
- Four choices per question with case-specific correct and incorrect explanations.
- A standalone offline HTML practice copy and a JSON export.

## Preserved
- No edits to the focused Endocrine 90, instructor review 110, original Discord mock 200/199, Urinary, other course banks, or existing quiz history keys.
- No changes to clinical source directives or medication dose reference tables.
- Previous main entrypoint saved as v9.8.5_rollback_index.html.

## Testing and boundaries
- Passed: 21 unique IDs, four distinct choices each, one answer key each, correct + incorrect rationales; A-D key balance.
- Passed: standalone browser click, answer feedback, next-question navigation.
- Passed: isolated browser harness for All 21, Quick 10, and selected-source 50 capped to 21.
- The sandbox could not complete a full end-to-end browser test of the unpacked large live application. Live-site user confirmation remains useful.
- These questions are educational cases composed from supplied lecture/review and verified directive references; they are **not** original instructor exam or Discord mock questions.
- ALS PCS 5.4 remains in force as checked on 2026-10-17; 5.5 was proposed for consultation only. Local PCP authorization still controls practice.
