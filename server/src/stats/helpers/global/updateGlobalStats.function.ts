import reduceWordsVariation from "./reduceWordsVariation.function";
import updateGlobalLessonsStats from "./updateGlobalLessonsStats.function";

import exercisesStats from "../../../exercises/data/globalStats";
import { LessonsStats } from "../../../graphql/types";
import {
  GOLD_WORD_SCORE,
  GREEN_WORD_SCORE,
  MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS,
  STUDIED_WORD_SCORE,
} from "../../constants";
import GlobalStats from "../../interfaces/globalStats.interface";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Produces a globalStats object from wordResults and lessonsStats
 */
const updateGlobalStats = (
  wordResults: WordResult[],
  lessonsStats: Partial<LessonsStats>,
  globalStats: GlobalStats
): GlobalStats => {
  const { studiedWords, greenWords, goldWords } = globalStats;

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
  const globalProgressAsString =
    (STUDIED_WORD_SCORE * updatedStudiedWords +
      GREEN_WORD_SCORE * updatedGreenWords +
      GOLD_WORD_SCORE * updatedGoldWords) /
    (exercisesStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS);
  const globalProgress = Number(globalProgressAsString);

  // update lessons global stats
  const {
    studiedLessons,
    greenLessons,
    goldLessons,
  } = updateGlobalLessonsStats(lessonsStats);

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
