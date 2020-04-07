import { UpdatedGlobalLessonsStats } from "../../interfaces/globalStats.interface";
import { LessonsStats } from "../../interfaces/lessonsStats.interface";

const assessGlobalLessonsStats = (
  lessonsStats: Partial<LessonsStats>
): UpdatedGlobalLessonsStats => {
  let studiedLessons = 0;
  let greenLessons = 0;
  let goldLessons = 0;

  Object.keys(lessonsStats).forEach((theme) => {
    studiedLessons += Object.keys(lessonsStats[theme]).length;
    Object.keys(lesson).forEach((theme) => {
      greenLessons += themesStats[theme].green;
      goldLessons += themesStats[theme].gold;
    });
  });

  return { studiedLessons, greenLessons, goldLessons };
};

export default updateGlobalLessonsStats;
