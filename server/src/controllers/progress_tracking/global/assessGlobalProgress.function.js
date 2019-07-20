import themes from "../../../exercises/FR-EN/themes";
import assessGlobalWordsStats from "./assessGlobalWordsStats.function";
import assessGlobalLessonsStats from "./assessGlobalLessonsStats.function";

const assessGlobalProgress = (wordStats, user) => {
  const totalNumberOfWords = themes.reduce((acc, val) => {
    return acc + val[1];
  }, 0);

  const wordsScores = assessGlobalWordsStats(wordStats);
  const lessonsScores = assessGlobalLessonsStats(user);
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
    goldLessons: lessonsScores.goldLessons
  };
};

export default assessGlobalProgress;
