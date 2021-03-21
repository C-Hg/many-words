import getLessonScoreVariation from "./getLessonScoreVariation.function";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import { LessonCompletion } from "../../../exercises/types/curriculum.interface";
import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Returns the updated lessons array
 * Note: for performance optimization, we could also update directly the index of the array with mongo
 */
const getUpdatedLessons = (
  wordsResults: WordResult[],
  lessons: LessonCompletion[]
): LessonCompletion[] => {
  const scoreVariation = getLessonScoreVariation(wordsResults);
  const lessonToUpdate = wordsResults[0].wordStats.lesson;
  const wordsInLesson = wordCountByLesson[lessonToUpdate];
  const lessonIndex = lessons.findIndex(
    (lesson) => lesson.name === lessonToUpdate
  );

  // the lessons array does not include this lesson, include it now
  if (lessonIndex === -1) {
    return [
      ...lessons,
      {
        completion: scoreVariation / (MAX_WORD_SCORE_IN_LESSON * wordsInLesson),
        name: lessonToUpdate,
      },
    ];
  }

  // the lesson has already been encountered: update the score
  return lessons.map((lesson, index) => {
    if (lessonIndex === index) {
      const previousScore = lesson.completion;
      // convert and apply the score variation of this word to the previous total score
      const newScore =
        scoreVariation / (MAX_WORD_SCORE_IN_LESSON * wordsInLesson) +
        previousScore;
      return { name: lesson.name, completion: newScore };
    }
    return lesson;
  });
};

export default getUpdatedLessons;

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
