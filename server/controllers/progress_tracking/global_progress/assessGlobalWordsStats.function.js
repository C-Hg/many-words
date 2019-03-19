module.exports = function assessGlobalWordsStats(wordStats) {
  let greenWords = 0;
  let goldWords = 0;
  const encounteredWords = wordStats.length;
  let globalScore = wordStats.reduce((acc, val) => {
    if (val.global_score <= 0) {
      return acc;
    }
    if (val.global_score >= 2 && val.global_score < 4) {
      greenWords++;
    }
    if (val.global_score >= 4) {
      goldWords++;
    }
    if (val.global_score >= 5) {
      return acc + 5;
    }
    return acc + val.global_score;
  }, 0);
  console.log(wordStats);
  return {
    encounteredWords,
    greenWords,
    goldWords,
    globalScore
  };
};
