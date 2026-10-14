# Category 7 final batches and unified study page

These files add questions 201–300 and a unified 300-question study page. They do not change either product-label quiz.

## Install in Codespaces
1. Upload the ZIP into repository root.
2. `unzip -o TN_Category7_Final100_And_CombinedStudy.zip`
3. Validate with `python -m json.tool questions-batch-05.json >/dev/null && python -m json.tool questions-batch-06.json >/dev/null`
4. Open `category7-all-300.html` to verify behavior and formatting. Do not replace earlier batch pages.
5. Before making it public-facing, complete technical review of all questions and current Tennessee rules.
6. To commit the new files without altering existing label quizzes: `git add category7-batch-05.html category7-batch-06.html category7-all-300.html questions-batch-05.js questions-batch-06.js questions-batch-05.json questions-batch-06.json INSTALL.md && git commit -m "Add final Category 7 study questions and combined 300-question page" && git push origin main`

The homepage remains unchanged deliberately. Later update its 300-question tile to link to `category7-all-300.html` after review. All questions show immediate explanations; slide provenance is stored only in the question data, not displayed.
