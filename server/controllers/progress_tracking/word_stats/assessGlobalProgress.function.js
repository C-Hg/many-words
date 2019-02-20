const themes = require("../../../exercises/FR-EN/themes");
const assessGlobalScore = require("./assessGlobalScore.function");

module.exports = function assessGlobalProgress(wordStats) {
  const totalNumberOfWords = themes.reduce((acc, val) => {
    return acc + val[1];
  }, 0);

  const wordScores = assessGlobalScore(wordStats);
  const globalPercentage = Number(
    wordScores.globalScore / (totalNumberOfWords * 5)
  ).toFixed(3);
  return {
    globalPercentage: globalPercentage,
    greenWords: wordScores.greenWords,
    goldWords: wordScores.goldWords,
    encounteredWords: wordScores.encounteredWords
  };
};
