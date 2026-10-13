# Tennessee Category 7 Training Center

Static GitHub Pages starter site.

- `index.html`: homepage
- `label-exams.html`: **original pre-existing interactive Termidor SC and DeltaDust HTML copied byte-for-byte without edits**
- 300 Category 7 questions: **not yet created or published**. This site intentionally does not claim otherwise.

## Category 7 batch practice interface

Category 7 batch pages are study mode only: show the first question immediately, require an answer before advancing, reveal its grading and explanation after the answer, and show a score with missed-question review at the end. Do not add mode selection, timed exams, or a way to skip unanswered questions. New batch pages should load their `questions-batch-NN.js` data before the shared `category7-study-mode.js` controller and use the same study interface as the existing batch pages. Keep question text, answer keys, explanations, and slide references in the question data unchanged unless separately reviewed.

## Publishing

Upload the files to the root of `main`, then visit GitHub repository Settings → Pages → Build and deployment → Deploy from a branch → `main` and `/ (root)` → Save.

## Training quality and rights

Write 300 substantively distinct original questions grounded in the presentation and authoritative Tennessee/Core references, with a source slide/page, version/date, correct answer, explanation and verification state. Do not copy questions from third-party commercial exam sites. Do not publish unverified pesticide-application claims.

Existing two product label quizzes remain unchanged as requested, pending separate expert review before authoritative training use.
