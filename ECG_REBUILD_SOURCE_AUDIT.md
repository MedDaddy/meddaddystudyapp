# Med Daddy ECG Rebuild — Source Audit
Updated: 2026-10-30 • Release v9.11.12
Course: PCT II ECG interpretation (Ontario PCP)
Baseline repo: `MedDaddy/meddaddystudyapp` / main.

## Source uploads reviewed and how they are used
1. `4 Lead Interpretation.pptx` — 80 slides; anatomy, monitoring, waveforms, intervals, rhythm categories, AV blocks, pacing and ECG interpretation. New 4-lead questions cite slide ranges.
2. `12 Lead interpretation.pptx` — 68 slides; coronary ischemia, lead placement, ST analysis, mimics, axis and other 12-lead interpretation.
3. `12 lead CTS in class MBartfinal-1(1).pptx` — 80 slides; classroom coronary territories, lead groups, J point and TP baseline, STEMI mimics, and posterior/right-sided extension.
4. `Cardiovascular - Rhythm Interpretation and ECG(1).pptx` — 190 Chapter 30 slides; anatomy, conduction physiology, AV blocks, rhythm/clinical interpretation, pacemakers and 12-lead principles.
5. `ECG study tool(1).pptx` — 103 slides of instructor-tagged rhythm strips; the previous ECG Academy already contains 95 authentic original strip assets from this course source (66 used as 4-option image-based ECG questions).
6. `Copy of 2 Lead presentation -Game only-1(1).pptx` — 34 slides; labelled 2-lead rhythm quiz and ECG intervals. Source reviewed for rhythm-type distinctions; source images not newly reimported.
7. `ECG Interpretation and STEMI Updates Self-Study Package v7(1).pdf` — 28 pages. Coronary territories and 12/15-lead interpretation. **Older (2019-era) provincial bypass excerpts are historical teaching material, not a current protocol authority.**
8. `PCT II___ ECG Review.pdf` — 8-page instructor/peer review including 13 theory prompts, pacing and original rhythm strips; 10 additional targeted questions authored and linked to page 1 plus the lecture. Do not claim all image pages are imported.
9. `ECG Practice (1).pdf` — **original 50-item image-dependent mock**: Part 1 has 20 four-lead questions; Part 2 has 30 twelve-lead questions; original source answers are on page 25. This mock has **not yet been separately imported as a playable original-preserved deck** because the PDF's source strip images must accompany every question unchanged. **Do not call the current 66-image strip set this original mock**.
10. `ECG Rules and strips you need to know(1).pdf` — one-page rhythm list and shortcuts. Shortcuts such as “wide QRS must be ventricular” and “irregular must be fibrillation” are **not universal diagnostic rules** and must not become keyed facts; lecture evidence overrides these oversimplifications.
11. `Question 1(1).txt` — instructor-marked ECG multiple-choice practice text with answer/feedback. The file is available in the conversation; not represented as a separately preserved deck in this release.

## Original ECG Practice answer sheet (verbatim meaning, supplied keys not independently audited)
- Four-lead Q1–20 keys: **A B D B C C A D C B A C B A D B C D C D**.
- Twelve-lead Q1–30 keys: **D B D A C C A A [letter missing for Q9] C B C C A B C C B D B C D D A C D A C C B**.
- Twelve-lead Q9 text answer is *Posterior STEMI* but the supplied answer-sheet line omits the A/B/C/D letter; flag and inspect original options before import.
- Original mock words/options/strips should be preserved as their own source, not silently corrected from lecture notes or modern guidelines.

## Added preserved ECG Mock.pdf — v9.11.14 (2026-11-01)
- User uploaded **ECG Mock.pdf**, a 16-page, text-based **100-question** test (15 question pages plus page 16 supplied answer key). All 100 questions have four options and a source key. There are **no embedded rhythm-strip images** in this uploaded PDF.
- Nine original sections preserved individually in original sequence: Cardiac Anatomy/Lead Theory 10, ECG Format/Waveforms 15, Rate/Rhythm Rules 10, 12-Lead Views 10, STEMI/Mimics 10, Bundle Branch Blocks/Pathologies 10, Clinical Standards 10, Rhythm Identification (written/rules) 10, Final Review 15 = 100.
- Source was imported as `md_v91114_ecg_mock_original.js` with original question text/option text, section question number, page locator, original global 1–100 sequence and exactly the supplied key; only extraction-related whitespace/line wraps normalized. Multiple answer-sheet lines render their first key number as 2, 3, etc. instead of 11, 21, etc.; source answers were aligned sequentially without inventing letters.
- Standalone launcher `md_v91114_ecg_mock_launcher.js` appears directly inside ECG Academy as **Start Original 100-Question Mock**, outside either regenerated 4-/12-lead bank. Registers original IDs with existing quiz-safety Map; never mixes, shuffles, rewrites, deletes prior banks or clears progress.
- **Original key discrepancies flagged, not silently corrected:** global Q99 (Part 9, Q14): supplied answer C says return to local hospital if STEMI ECG normalizes after bypass activation; source BLS teaching supports continuing activated STEMI bypass (original option B). Global Q100 (Part 9, Q15): supplied answer B = obliquely straight but teaching typically describes concave elevation (original option C) as less suggestive of STEMI. The source answer letters **C and B** are still retained respectively in the playable mock and warnings appear with post-answer feedback.
- **Other source statements are not independently audited**: original supplied keys should not supersede uploaded course/official applicable directives, particularly current BLS bypass authorization/thresholds.
- Source mock is distinct from **ECG Practice (1).pdf**, the earlier **50-question image-based mock** whose original image import remains outstanding. Do not conflate these two PDFs.
- JavaScript/runtime simulation verified: 100 registered questions; launching selected all 100 in original order; no key mismatches or duplicate IDs; original errors flagged rather than adjusted; syntax and script order passed. Live browser rendering still unverified.

## New deployed question structure
- Original ECG Academy: 188 source-linked questions, including 66 authentic image questions; 95 full original rhythm strips; 16 full 12-lead tracings, source assets preserved unchanged.
- New authoring: 25 hard 4-lead questions; 10 instructor review-focused 4-lead questions; 37 hard 12-lead questions, each four options, one key, distinct rationales for all wrong options, and explicit reference locator. **72 new total**.
- 4-lead section: **199 questions** including source-based rhythm interpretation, anatomy, calculations, paced rhythms, blocks and clinical interpretation.
- 12-lead section: **61 questions** including lead placement, coronary anatomy, ischemia, territories, ST mimics and Ontario PCP bypass logic.
- Default instructor challenge is 50 questions and prioritizes 35 newly authored hard questions while retaining authentic images (4 lead). Separate 50-image test, focused review paths and full bank provided.
- No fake diagnosis assigned to the 16 full 12-lead observation tracings; original gallery remains available.
- Ontario rules checked against **BLS PCS v3.4**, current as of 2026-10-30, not the older bypass slide deck. **ALS PCS v5.4** scope remains a separate authorization requirement for medical treatment.

## QA performed
- Checked 72 new records for unique IDs, four distinct options, one A–D answer key, individualized wrong-answer rationales, source locator and leakage conditions.
- Simulated core registration and study starts: 50 unique registered 4-lead challenge questions (35 new, 15 authentic strip), 50 unique original image questions in visual mode, 50 unique 12-lead challenge questions (35 new), all 61 in 12-lead full unit.
- Confirmed old 188 remain preserved, original source images stay referenced, no saved stats keys deleted, auto-update not reintroduced.
- **Outstanding:** live browser regression test; full original `ECG Practice (1).pdf` image-and-options preservation; separately reproduce `Question 1(1).txt` practice set; independent clinical audit of all previous 188 questions and historical source slide shortcuts.

## Follow-on gold-standard work
- Import original 50-item ECG Practice PDF *with actual source tracing images* and supplied keys in an independent mock section.
- Expand each of the 13 instructor review prompts to 5 robust questions, where the source supports them.
- Add original 12-lead image-based keyed questions only when each image has independently verified answer/source.
