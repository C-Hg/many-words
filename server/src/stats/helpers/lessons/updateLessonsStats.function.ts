import cloneDeep from "lodash.clonedeep";

import getLessonsScoreVariation from "./getLessonsScoreVariation.function";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import { LessonCompletion } from "../../../exercises/types/curriculum.interface";
import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Update the lesson scores in stats.lessons
 */
const updateLessonsStats = (
  wordsResults: WordResult[],
  lessonsScores: LessonCompletion[]
): LessonsScores => {
  const lessonsScoreVariation = getLessonsScoreVariation(wordsResults);
  const updatedLessonsScores = cloneDeep(lessonsScores);

  lessonsScoreVariation.forEach((lessonScoreVariation) => {
    const { lesson, scoreVariation } = lessonScoreVariation;
    const previousScore = lessonsScores?.[lesson] || 0;
    const wordsInLesson = wordCountByLesson[lesson];

    // convert and apply the score variation of this word to the previous total score
    const newScore =
      scoreVariation / (MAX_WORD_SCORE_IN_LESSON * wordsInLesson) +
      previousScore;

    // update the value
    updatedLessonsScores[lesson] = newScore;
  });

  return updatedLessonsScores;
};

export default updateLessonsStats;

/*
The lesson score is a percentage
>80% is considered golden
>40% is considered ok (green)

the percentage is calculated by summing the scores of each word
a score of 5 for all words must be achieved to reach 100%
a mean score of 4 equals to golden
a mean score of 2 equals to green

word scores below zero count for 0
word scores superior to 5 count for 5
*/
