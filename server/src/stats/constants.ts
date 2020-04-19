// the global score for a word, above which the word is "green" = known
const WORD_GREEN_THRESHOLD = 2;
// the global score for a word, above which the word is "gold" = known well
const WORD_GOLD_THRESHOLD = 4;
// the maximum score that a word can be worth in the score of a lesson
const MAX_WORD_SCORE_IN_LESSON = 5;
// the score of encountered words for global stats
const STUDIED_WORD_SCORE = 1;
// the score of green words for global stats
const GREEN_WORD_SCORE = 1;
// the score of gold words for global stats
const GOLD_WORD_SCORE = 2;
// the maximum score of a word for global stats
const MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS = STUDIED_WORD_SCORE + GOLD_WORD_SCORE;

// the global score percentage for a lesson, above which the lesson is "green" = known
const LESSON_GREEN_THRESHOLD = 0.4;
// the global score for a lesson, above which the lesson is "gold" = known well
const LESSON_GOLD_THRESHOLD = 0.8;

export {
  GOLD_WORD_SCORE,
  GREEN_WORD_SCORE,
  LESSON_GOLD_THRESHOLD,
  LESSON_GREEN_THRESHOLD,
  MAX_WORD_SCORE_IN_LESSON,
  MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS,
  STUDIED_WORD_SCORE,
  WORD_GREEN_THRESHOLD,
  WORD_GOLD_THRESHOLD,
};
