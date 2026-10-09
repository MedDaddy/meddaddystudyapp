MED DADDY v9.6.6 - GITHUB PAGES DEPLOYMENT

Fix: The earlier ZIP bundled an uncompressed 33.9 MB index.html, which exceeded the GitHub browser upload limit of 25 MB.
This corrected package uses the v9.6.6 self-contained, gzip-packed HTML (19.3 MB) as index.html.

To publish:
1. Extract this ZIP on your computer. Do NOT upload the ZIP itself as a GitHub Pages app.
2. In your repository root, replace the OLD index.html with the index.html from this package.
3. Commit changes; wait for GitHub Pages deployment and open your site.
4. Hard refresh the site (Ctrl+Shift+R) to avoid a cached previous version.
5. Test the 25-question urinary exam launcher and the original urinary mock.

All quiz code and question content are identical to v9.6.6's uncompressed index.html.
The original JSON exports are included for source/backup only; the HTML is self-contained and does not fetch them.

Browser requirement: DecompressionStream('gzip') is required. Supported by current Chrome, Edge, Firefox and Safari (Safari 16.4+). Older Safari browsers may need an alternate deployment.

Preserve your older deployment as a rollback.
