# Tennessee Category 7 Training Center

Static GitHub Pages starter site.

- `index.html`: homepage
- `label-exams.html`: **original pre-existing interactive Termidor SC and DeltaDust HTML copied byte-for-byte without edits**
- 300 Category 7 questions: **not yet created or published**. This site intentionally does not claim otherwise.

## Category 7 batch practice interface

Category 7 batch pages are standalone, study-mode-only pre-class practice: show the first question immediately, require an answer before advancing, reveal grading and an explanatory lesson after the answer, and show a score with missed-question review at the end. Do not add mode selection, timed exams, or a way to skip unanswered questions. New batch pages should load their `questions-batch-NN.js` data before the shared `category7-study-mode.js` controller and use the same study interface as the existing batch pages. Keep instructor-audit source metadata in the question data, but never render it to students. Explanations must teach the concept without requiring class materials; verify technical content before treating draft questions as authoritative.

## Publishing

Upload the files to the root of `main`, then visit GitHub repository Settings → Pages → Build and deployment → Deploy from a branch → `main` and `/ (root)` → Save.

## Training quality and rights

Write 300 substantively distinct original questions grounded in authoritative Tennessee/Core references, with internal source citations, version/date, correct answer, explanation and verification state. Do not copy questions from third-party commercial exam sites. Do not publish unverified pesticide-application claims.

Existing two product label quizzes remain unchanged as requested, pending separate expert review before authoritative training use.
