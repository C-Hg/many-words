module.exports = function assessGlobalScore(wordStats) {
  let greenWords = 0;
  let goldWords = 0;
  const encounteredWords = wordStats.length;
  let globalScore = wordStats.reduce((acc, val) => {
    if (val.global_score <= 0) {
      return acc;
    }
    if (val.global_score >= 2 && val.global_score < 5) {
      greenWords++;
      return acc + val.global_score;
    } else if (val.global_score >= 4) {
      goldWords++;
      return acc + 5;
    }
  }, 0);

  return {
    greenWords: greenWords,
    goldWords: goldWords,
    globalScore: globalScore,
    encounteredWords: encounteredWords
  };
};
