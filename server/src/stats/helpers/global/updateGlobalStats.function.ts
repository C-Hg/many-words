import reduceWordsVariation from "./reduceWordsVariation.function";

import exercisesStats from "../../../exercises/data/globalStats";
import {
  GLOBAL_PROGRESS_PRECISION,
  GOLD_WORD_SCORE,
  GREEN_WORD_SCORE,
  MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS,
  STUDIED_WORD_SCORE,
} from "../../constants";
import GlobalStats from "../../interfaces/globalStats.interface";
import { LessonsStats } from "../../interfaces/lessonsStats.interface";
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

  // TODO: global progress and lessons global stats
  // update global progress
  const updatedGlobalProgress = (
    (STUDIED_WORD_SCORE * updatedStudiedWords +
      GREEN_WORD_SCORE * updatedGreenWords +
      GOLD_WORD_SCORE * updatedGoldWords) /
    (exercisesStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS)
  ).toFixed(GLOBAL_PROGRESS_PRECISION);

  // update lessons global stats

  return {
    globalPercentage,
    encounteredWords: wordsScores.encounteredWords,
    greenWords: wordsScores.greenWords,
    goldWords: wordsScores.goldWords,
    studiedLessons: lessonsScores.studiedLessons,
    greenLessons: lessonsScores.greenLessons,
    goldLessons: lessonsScores.goldLessons,
  };
};

export default updateGlobalStats;
