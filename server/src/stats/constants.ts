// the global score for a word, above which the word is "green" = known
const WORD_GREEN_THRESHOLD = 2;
// the global score for a word, above which the word is "gold" = known well
const WORD_GOLD_THRESHOLD = 4;
// the maximum score that a word can be worth in the score of a lesson
const MAX_WORD_SCORE = 5;

// the global score percentage for a lesson, above which the lesson is "green" = known
const LESSON_GREEN_THRESHOLD = 0.4;
// the global score for a lesson, above which the lesson is "gold" = known well
const LESSON_GOLD_THRESHOLD = 0.8;
// the precision for the lessons stats (max number of decimals)
const LESSON_SCORE_PRECISION = 5;

export {
  LESSON_SCORE_PRECISION,
  LESSON_GOLD_THRESHOLD,
  LESSON_GREEN_THRESHOLD,
  MAX_WORD_SCORE,
  WORD_GREEN_THRESHOLD,
  WORD_GOLD_THRESHOLD,
};
