const themes = require("../../../exercises/FR-EN/themes");
const assessGlobalWordsStats = require("./assessGlobalWordsStats.function");
const assessGlobalLessonsStats = require("./assessGlobalLessonsStats.function");

module.exports = function assessGlobalProgress(wordStats) {
  const totalNumberOfWords = themes.reduce((acc, val) => {
    return acc + val[1];
  }, 0);

  const wordsScores = assessGlobalWordStats(wordStats);
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
