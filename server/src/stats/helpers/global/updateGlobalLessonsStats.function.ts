import { LessonsStats } from "../../../graphql/types";
import { LESSON_GOLD_THRESHOLD, LESSON_GREEN_THRESHOLD } from "../../constants";
import { GlobalLessonsStats } from "../../interfaces/globalStats.interface";

/**
 * Produces the global lessons stats from lessonsStats
 */
const updateGlobalLessonsStats = (
  lessonsStats: Partial<LessonsStats>
): GlobalLessonsStats => {
  let studiedLessons = 0;
  let greenLessons = 0;
  let goldLessons = 0;

  // get the topics in an array
  const topics = Object.values(lessonsStats);

  topics.forEach((topic) => {
    if (!topic) {
      return;
    }
    // get the lessons scores in each topic as an array
    const lessonsScores = Object.values(topic as Array<number>);
    // count all the lessons as studied
    studiedLessons += lessonsScores.length;

    // for each lesson, increment gold/green lessons if the score is high enough
    lessonsScores.forEach((lessonScore) => {
      if (lessonScore >= LESSON_GOLD_THRESHOLD) {
        goldLessons += 1;
      } else if (lessonScore >= LESSON_GREEN_THRESHOLD) {
        greenLessons += 1;
      }
    });
  });

  return { studiedLessons, greenLessons, goldLessons };
};

export default updateGlobalLessonsStats;
