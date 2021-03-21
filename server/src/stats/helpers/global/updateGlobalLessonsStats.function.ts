import { LessonCompletion } from "../../../exercises/types/curriculum.interface";
import { LESSON_GOLD_THRESHOLD, LESSON_GREEN_THRESHOLD } from "../../constants";
import GlobalLessonsStats from "../../interfaces/globalLessonsStats.interface";

/**
 * Produces the global lessons stats from lessonsStats
 */
const updateGlobalLessonsStats = (
  lessons: LessonCompletion[]
): GlobalLessonsStats => {
  // TODO: check in e2e that typename is not counted, should be safe if it is added when sent to the client
  const studiedLessons = lessons.length;
  let greenLessons = 0;
  let goldLessons = 0;

  // for each lesson, increment gold/green lessons if the score is high enough
  // NB: completion cannot be undefined
  lessons.forEach(({ completion }) => {
    if (completion >= LESSON_GOLD_THRESHOLD) {
      goldLessons += 1;
    } else if (completion >= LESSON_GREEN_THRESHOLD) {
      greenLessons += 1;
    }
  });

  return { studiedLessons, greenLessons, goldLessons };
};

export default updateGlobalLessonsStats;
