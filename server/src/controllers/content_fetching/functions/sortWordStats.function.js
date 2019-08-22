module.exports = function sortWordStats(wordStats) {
  return wordStats.sort((a, b) => {
    return a.globalScore - b.globalScore;
  });
};
