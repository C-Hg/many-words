import cloneDeep from "lodash.clonedeep";

import wordCountByLesson from "../../exercises/data/wordCountByLesson";
import { User } from "../../user/interfaces/user.interface";
import CONSTANTS from "../constants";
import {
  LessonsStats,
  NewLessonsStats,
} from "../interfaces/lessonsStats.interface";
import WordResult from "../interfaces/wordResult.interface";
import getNewLessonsStats from "./getNewLessonsStats.function";

const updateLessonsStats = (
  wordsResults: WordResult[],
  user: User
): LessonsStats => {
  const { lessons: lessonsStats } = user.stats;
  const updateLessonsStats = cloneDeep(lessonsStats);
  const gewLessonsStats = getNewLessonsStats(wordsResults);

    const wordsInLesson = wordCountByLesson[lesson];

    const previousScore = lessonsStats?.[topic]?.[lesson] || 0;

    // convert the displayed score to the sum of all words' global scores in this lesson
    const previousTotalScore =
      previousScore * wordsInLesson * CONSTANTS.MAX_WORD_SCORE;
    // apply the score variation of this word to the previous total score
    const newTotalScore = previousTotalScore + globalScoreVariation;
    // save the score to display in the lessonsStats object
    const newScore = newTotalScore / (wordsInLesson * 5);
  });
};

export default updateLessonsStats;
