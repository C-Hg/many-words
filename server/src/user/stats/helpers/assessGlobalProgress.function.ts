import assessGlobalWordsStats from "./assessGlobalWordsStats.function";
import assessGlobalLessonsStats from "./assessGlobalLessonsStats.function";
import topicsWithLessonsCount from "../../../exercises/data/topicsWithLessonsCount";

const assessGlobalProgress = (
  wordStats,
  updatedLessonsStats,
  updatedThemesStats
) => {
  const totalNumberOfWords = topicsWithLessonsCount.reduce((acc, val) => {
    return acc + val[1];
  }, 0);

  const wordsScores = assessGlobalWordsStats(wordStats);
  const lessonsScores = assessGlobalLessonsStats(
    updatedLessonsStats,
    updatedThemesStats
  );
  const globalPercentage = Number(
    wordsScores.globalScore / (totalNumberOfWords * 5)
  ).toFixed(3);

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

export default assessGlobalProgress;
