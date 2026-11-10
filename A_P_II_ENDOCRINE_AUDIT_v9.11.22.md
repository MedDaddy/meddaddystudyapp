# Med Daddy v9.11.22 — A&P II Endocrine audit

Scope: Endocrine Review (25 points), Endocrine Regulation and Glands Quick Checks, Patton 11e Chapters 25–26. Male reproductive unit remains separate.

## Question-bank checks
- 125 instructor review questions (5 per point, 25 points)
- 72 lecture Quick Check questions (3 per prompt, 24 prompts)
- 39 Patton review and critical-thinking adapted MCQs (Ch25 6+5; Ch26 18+10)
- 236 distinct playable question IDs/stems; 4 choices each; no exact duplicate prompts
- Answer-position distribution: A59/B58/C59/D60
- High Yield 50: 10 concepts, five questions each; curated subset, not 50 extra original questions
- Individual correct and incorrect option rationales and source references present
- A subtle fasting islet-cell question stem and answer/rationale rewritten to distinguish higher glucagon and lower insulin output.

## Navigation dry-run
- Existing A&P parent/launcher present in stub DOM; home card, back, unit show/hide tested
- Sessions tested: High Yield 50; Review 125; Lecture 72; Patton-blend 50; Full Science 236
- Registry 236; no collisions; five launch pool IDs and answer keys match

## Publishing
- Pages remains sourced from `main` / `/(root)`.
- This version excludes eight superseded full-size HTML builds from the generated Pages artifact using `_config.yml` to reduce deployment sync workload. All eight remain in source control. `v9.7.6_baseline.html`, media.js, assets, all live units and source mocks remain published.
- Full real-browser navigation and deployment success require post-publish verification. No changes to unrelated question banks.
