# Med Daddy v9.9.2 — Abdominal Study Hub UI Alignment

**Release date:** 2026-10-21
**Scope:** PCT II Unit 6 Abdominal Emergencies UI; no question content changes.

## Student-facing changes
- Replaced the crowded independent Abdominal launcher page with a consistent Endocrine-style hub.
- One primary **Practice Exam (50)**, secondary **Daily Review (up to 20)**, **Full Bank (80)** and **Quick Review (10)**.
- Source selector: entire bank, Chapter 27 abdominal trauma, Chapter 34 GI emergencies, PCP clinical decisions, or one of 16 topics.
- Session-size selector: 10, 20, 30, 50, or all available. Count preview is based on the selected pool, not an invented number.
- Collapsible recognition/study map and separate source/audit notes.
- PCT II landing-page buttons simplified to **Open Abdominal study hub** and **Practice Exam (50)**.
- Device-local progress summary: seen, outstanding missed, and unseen Abdominal questions.

## Daily Review mechanics
Reads **existing** Med Daddy localStorage sets `msk_missed_v1` and `msk_seen_v11`. Builds a list of previously missed Abdominal questions, then fills the remainder from entirely unseen Abdominal questions, maximum 20. Uses the shared `start()` quiz engine and its existing `saveResult()` history update; no separate progress system or key. If none remain, offers Full Bank rather than silently repeating completed items.

## Preserved
- The 80 independently authored Abdominal questions in `md_v990_pct_abdominal.js` and `pct2_abdominal_80_source_v990.json`.
- Every other unit and source bank, answer key, analytics settings, existing localStorage data, and rollback HTML files.
- The submitted 120-question Abdominal source mock remains preserved but excluded from scoring pending item-level key validation.
- No Answer Lab files, controls, or links included.

## Files
- Added `md_v992_abdominal_hub.js`.
- Updated `index.html` to load that patch **after** `md_v990_pct_abdominal.js` and before optional analytics; shell version is now v9.9.2.
- This release note.

## QA and limits
- **Passed static checks:** script syntax, file existence, load order, shell version, presence of existing-history key references, non-inclusion of the unaudited mock in scoring.
- **Not claimed:** live-browser end-to-end QA or exhaustive medical question/source audit.
- The exam bank remains 80 items and does not claim five questions per each of 51 expanded review points.

## Quick manual smoke test
1. Hard refresh the deployed Med Daddy site (Ctrl+Shift+R) and confirm v9.9.2.
2. Open PCT II > Unit 6 > Open Abdominal study hub.
3. Start Quick Review 10 and confirm 10 questions; submit an answer and inspect take-up/source citation.
4. Return and open Daily Review. Verify unanswered/unseen pool behavior (first-use 20, after completing 20 a different unseen set) and that seen/missed counts update.
5. Start Practice Exam 50 and verify 50 questions; test a selected chapter and a topic.
6. Check Endocrine and Urinary remain available and previous results persist.

**Rollback:** Previous `v9.9.0_rollback_index.html` is preserved in the repo; revert index.html or remove v9.9.2 import to restore old Abdominal UI without deleting the question bank.
