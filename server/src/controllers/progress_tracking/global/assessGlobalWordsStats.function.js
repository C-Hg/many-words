const assessGlobalWordsStats = wordStats => {
  let greenWords = 0;
  let goldWords = 0;
  const encounteredWords = wordStats.length;
  const globalScore = wordStats.reduce((acc, val) => {
    if (val.globalScore <= 0) {
      return acc;
    }
    if (val.globalScore >= 2 && val.globalScore < 4) {
      greenWords++;
    }
    if (val.globalScore >= 4) {
      goldWords++;
    }
    if (val.globalScore >= 5) {
      return acc + 5;
    }
    return acc + val.globalScore;
  }, 0);
  return {
    encounteredWords,
    greenWords,
    goldWords,
    globalScore
  };
};

export default assessGlobalWordsStats;
