import reduceWordsVariation from "./reduceWordsVariation.function";
import updateGlobalLessonsStats from "./updateGlobalLessonsStats.function";

import exercisesStats from "../../../exercises/data/globalStats";
import { Stats } from "../../../graphql/types";
import {
  GOLD_WORD_SCORE,
  GREEN_WORD_SCORE,
  MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS,
  STUDIED_WORD_SCORE,
} from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Produces a globalStats object from wordResults and lessonsStats
 */
const updateGlobalStats = (
  wordResults: WordResult[],
  lessonsScores: LessonsCompletion[],
  stats: Stats
): Stats => {
  const { studiedWords, greenWords, goldWords } = stats;

  // reduce the words variations and update words global stats
  const {
    studiedWordsVariation,
    greenWordsVariation,
    goldWordsVariation,
  } = reduceWordsVariation(wordResults);

  const updatedStudiedWords = studiedWords + studiedWordsVariation;
  const updatedGreenWords = greenWords + greenWordsVariation;
  const updatedGoldWords = goldWords + goldWordsVariation;

  // update global progress
  const globalProgress =
    (STUDIED_WORD_SCORE * updatedStudiedWords +
      GREEN_WORD_SCORE * updatedGreenWords +
      GOLD_WORD_SCORE * updatedGoldWords) /
    (exercisesStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS);

  // update lessons global stats
  const {
    studiedLessons,
    greenLessons,
    goldLessons,
  } = updateGlobalLessonsStats(lessonsScores);

  return {
    globalProgress,
    studiedWords: updatedStudiedWords,
    greenWords: updatedGreenWords,
    goldWords: updatedGoldWords,
    studiedLessons,
    greenLessons,
    goldLessons,
  };
};

export default updateGlobalStats;
