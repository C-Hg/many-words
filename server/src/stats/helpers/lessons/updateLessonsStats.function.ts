import cloneDeep from "lodash.clonedeep";
import set from "lodash.set";

import getNewLessonsStats from "./getNewLessonsStats.function";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import { LessonsStats } from "../../../graphql/types";
import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Produces an updated LessonsStats object from a wordResults array
 */
const updateLessonsStats = (
  wordsResults: WordResult[],
  lessonsStats: Partial<LessonsStats>
): Partial<LessonsStats> => {
  const newLessonsStats = getNewLessonsStats(wordsResults);
  const updatedLessonsStats = cloneDeep(lessonsStats);

  newLessonsStats.forEach((newLessonStats) => {
    const { lesson, topic, scoreVariation } = newLessonStats;
    const previousScore = lessonsStats?.[topic]?.[lesson] || 0;
    const wordsInLesson = wordCountByLesson[lesson];

    // convert and apply the score variation of this word to the previous total score
    const newScore =
      scoreVariation / (MAX_WORD_SCORE_IN_LESSON * wordsInLesson) +
      previousScore;

    // update the value
    set(updatedLessonsStats, [topic, lesson], newScore);
  });

  return updatedLessonsStats;
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
