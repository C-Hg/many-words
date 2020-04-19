import { LessonsScores } from "../../../graphql/types";
import { LESSON_GOLD_THRESHOLD, LESSON_GREEN_THRESHOLD } from "../../constants";
import GlobalLessonsStats from "../../interfaces/globalLessonsStats.interface";

/**
 * Produces the global lessons stats from lessonsStats
 */
const updateGlobalLessonsStats = (
  lessonsScores: LessonsScores
): GlobalLessonsStats => {
  // TODO: check in e2e that typename is not counted, should be safe if it is added when sent to the client
  const studiedLessons = Object.keys(lessonsScores).length;
  let greenLessons = 0;
  let goldLessons = 0;

  // get the lessons scores in each topic as an array
  const scores = Object.values(lessonsScores as Array<number>);

  // for each lesson, increment gold/green lessons if the score is high enough
  scores.forEach((score) => {
    if (score >= LESSON_GOLD_THRESHOLD) {
      goldLessons += 1;
    } else if (score >= LESSON_GREEN_THRESHOLD) {
      greenLessons += 1;
    }
  });

  return { studiedLessons, greenLessons, goldLessons };
};

export default updateGlobalLessonsStats;
