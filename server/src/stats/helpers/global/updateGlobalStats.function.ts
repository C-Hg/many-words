import reduceWordsVariation from "./reduceWordsVariation.function";

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

  // reduce the words variations
  const {
    studiedWordsVariation,
    greenWordsVariation,
    goldWordsVariation,
  } = reduceWordsVariation(wordResults);

  const updatedStudiedWords = studiedWords + studiedWordsVariation;
  const updatedGreenWords = greenWords + greenWordsVariation;
  const updatedGoldWords = goldWords + goldWordsVariation;

  // TODO: global progress and lessons global stats
  // assess global progress with updated words :)

  return {};
};

export default updateGlobalStats;
