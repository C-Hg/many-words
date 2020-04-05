import { NewLessonsStats } from "../../interfaces/lessonsStats.interface";
import WordResult from "../../interfaces/wordResult.interface";

/**
 * Extract newLessonsStats from wordResults
 */
const getNewLessonsStats = (wordsResults: WordResult[]): NewLessonsStats[] => {
  const statsGroupedByLesson: NewLessonsStats[] = [];

  wordsResults.forEach((wordResults) => {
    const { topic, lesson } = wordResults.wordStats;
    const { globalScoreVariation } = wordResults;

    // type guard
    if (globalScoreVariation === undefined) {
      throw new Error(
        `[updateLessonsStats] score variation undefined for ${JSON.stringify(
          wordResults
        )}`
      );
    }

    const lessonStatsIndex = statsGroupedByLesson.findIndex(
      (lessonScore) => lessonScore?.lesson === lesson
    );
    if (lessonStatsIndex >= 0) {
      // an entry for this lesson already exists
      statsGroupedByLesson[
        lessonStatsIndex
      ].scoreVariation += globalScoreVariation;
    } else {
      // an entry for this lesson needs to be created
      statsGroupedByLesson.push({
        lesson,
        topic,
        scoreVariation: globalScoreVariation,
      });
    }
  });

  return statsGroupedByLesson;
};

export default getNewLessonsStats;
