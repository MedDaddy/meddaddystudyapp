# Med Daddy v9.8.7 — Scenario Challenge launcher hotfix

## Problem
The v9.8.6 Scenario Challenge added 21 new source-mapped questions but did not register the question IDs with the existing canonical answer-leak safety registry. Two nested study-engine wrappers then rejected all 21 items. The app showed "No missed or unseen questions match those filters" and "Scenario Challenge expected 21 questions but got 0." Neither message meant the student needed to clear progress.

## Changes
- Added a guarded registration step for all 21 v9.8.6 scenario questions using the existing MD_SAFE_QUESTIONS registry.
- Registration validates the 21 unique IDs, four answer choices, answer keys, explanation presence and existing mdLeakReason safety gate before accepting the set.
- Preserved v9.8.6's existing Study all 21, Quick 10, and source-menu launchers. No question contents changed.
- Preserved all original study banks, the preserved Discord mock, urinary content, medical directives, localStorage keys, and progress.
- Kept index.html from v9.8.6 as v9.8.6_rollback_index.html and updated the displayed version to v9.8.7.

## Testing
- Reproduced both user-reported alerts using a browser regression harness with the actual v9.8.6 launcher and the nested canonical question filtering logic.
- After patch: all 21, quick 10, source selector set to 50 (capped to available 21), and source selector set to 10 all launched at the expected counts, with no script errors.
- JavaScript syntax validation passed.
- Limitation: the large full application could not be opened in the local browser environment; this is an isolated integration regression, not a full public-site browser test. GitHub Pages deployment status is verified separately.

This is a routing fix, not clinical verification of the 21 scenarios.
