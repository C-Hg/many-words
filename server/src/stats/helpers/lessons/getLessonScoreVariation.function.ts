import error500 from "../../../utils/errors/error500";
import logger from "../../../utils/logger";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Compute the updated lessons stats from wordResults
 * Works only for quiz mode, not weak words mode
 */
const getLessonScoreVariation = (wordsResults: WordResult[]): number => {
  return wordsResults.reduce((lessonScoreVariation, wordResults) => {
    const { scoreVariation } = wordResults;

    // type guard
    if (scoreVariation === undefined) {
      logger.error(
        `[updateLessonsStats] score variation undefined for ${JSON.stringify(
          wordResults
        )}`
      );
      throw error500;
    }

    return lessonScoreVariation + scoreVariation;
  }, 0);
};

export default getLessonScoreVariation;
