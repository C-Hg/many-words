import logger from "../../../utils/logger";
import { LessonScoreVariation } from "../../interfaces/lessonScoreVariation.interface";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Extract newLessonsStats from wordResults
 */
const getLessonsScoreVariation = (
  wordsResults: WordResult[]
): LessonScoreVariation[] => {
  const lessonsScoreVariation: LessonScoreVariation[] = [];
  wordsResults.forEach((wordResults) => {
    const { lesson } = wordResults.wordStats;
    const { globalScoreVariation } = wordResults;

    // type guard
    if (globalScoreVariation === undefined) {
      logger.error(
        `[updateLessonsStats] score variation undefined for ${JSON.stringify(
          wordResults
        )}`
      );
      throw new Error(
        `[updateLessonsStats] score variation undefined for ${JSON.stringify(
          wordResults
        )}`
      );
    }

    const lessonStatsIndex = lessonsScoreVariation.findIndex(
      (lessonScore) => lessonScore?.lesson === lesson
    );
    if (lessonStatsIndex >= 0) {
      // an entry for this lesson already exists
      lessonsScoreVariation[
        lessonStatsIndex
      ].scoreVariation += globalScoreVariation;
    } else {
      // an entry for this lesson needs to be created
      lessonsScoreVariation.push({
        lesson,
        scoreVariation: globalScoreVariation,
      });
    }
  });

  return lessonsScoreVariation;
};

export default getLessonsScoreVariation;
