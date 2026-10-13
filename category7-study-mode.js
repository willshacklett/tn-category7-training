(() => {
  'use strict';

  const questions = window.C7_QUESTIONS;
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Category 7 study mode requires a non-empty C7_QUESTIONS array.');
  }

  const by = id => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Category 7 study mode is missing #${id}.`);
    return element;
  };
  const progress = by('progress');
  const questionHeading = by('question');
  const options = by('options');
  const feedback = by('feedback');
  const quiz = by('quiz');
  const nextButton = by('next');
  const results = by('results');
  const score = by('score');
  const reviewButton = by('toggle-review');
  const review = by('review');
  const answers = Array(questions.length).fill(null);
  let at = 0;

  function renderQuestion() {
    const question = questions[at];
    if (
      !question ||
      typeof question.question !== 'string' ||
      !Array.isArray(question.options) ||
      !Number.isInteger(question.answer) ||
      question.answer < 0 ||
      question.answer >= question.options.length ||
      typeof question.explanation !== 'string' ||
      question.explanation.trim() === ''
    ) {
      throw new Error(`Category 7 question ${at + 1} has invalid data.`);
    }

    progress.textContent = `Question ${at + 1} of ${questions.length}`;
    questionHeading.textContent = question.question;
    options.replaceChildren();
    feedback.replaceChildren();

    question.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'choice';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.disabled = answers[at] !== null;
      input.checked = answers[at] === index;
      input.onchange = () => {
        if (answers[at] !== null || !input.checked) return;
        answers[at] = index;
        renderFeedback(question);
        nextButton.disabled = false;
        options.querySelectorAll('input').forEach(choice => {
          choice.disabled = true;
        });
      };
      label.append(input, document.createTextNode(` ${String.fromCharCode(65 + index)}. ${option}`));
      options.append(label);
    });

    nextButton.textContent = at === questions.length - 1
      ? 'Finish and View Score'
      : 'Next Question';
    nextButton.disabled = answers[at] === null;
  }

  function renderFeedback(question) {
    const isCorrect = answers[at] === question.answer;
    const box = document.createElement('div');
    box.className = `feedback${isCorrect ? '' : ' wrong'}`;
    box.textContent =
      `${isCorrect ? 'Correct.' : 'Incorrect.'} Correct answer: ` +
      `${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}. ` +
      question.explanation;
    feedback.replaceChildren(box);
  }

  function showResults() {
    const correct = questions.reduce(
      (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
      0
    );
    score.textContent =
      `${correct} / ${questions.length} correct (${Math.round(100 * correct / questions.length)}%)`;
    quiz.classList.add('hidden');
    results.classList.remove('hidden');

    review.replaceChildren();
    const missed = questions
      .map((question, index) => ({ question, index, answer: answers[index] }))
      .filter(item => item.answer !== item.question.answer);
    if (missed.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'No missed questions to review.';
      review.append(message);
    } else {
      missed.forEach(({ question, index, answer }) => {
        const item = document.createElement('article');
        const heading = document.createElement('h3');
        heading.textContent = `${index + 1}. ${question.question}`;
        const response = document.createElement('p');
        response.textContent = `Your answer: ${String.fromCharCode(65 + answer)}. ${question.options[answer]}`;
        const correctAnswer = document.createElement('p');
        correctAnswer.textContent =
          `Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`;
        const explanation = document.createElement('p');
        explanation.textContent = question.explanation;
        item.append(heading, response, correctAnswer, explanation);
        review.append(item);
      });
    }
  }

  nextButton.onclick = () => {
    if (answers[at] === null) return;
    if (at === questions.length - 1) {
      showResults();
      return;
    }
    at += 1;
    renderQuestion();
  };

  reviewButton.onclick = () => {
    const expanded = reviewButton.getAttribute('aria-expanded') === 'true';
    reviewButton.setAttribute('aria-expanded', String(!expanded));
    review.classList.toggle('hidden', expanded);
    reviewButton.textContent = expanded ? 'Review Missed Questions' : 'Hide Missed Questions';
  };

  by('restart').onclick = () => location.reload();
  renderQuestion();
})();
