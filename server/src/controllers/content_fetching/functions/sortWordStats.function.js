module.exports = function sortWordStats(wordStats) {
  let sorted = wordStats.sort((a, b) => {
    return a.globalScore - b.globalScore;
  });
  return sorted;
};
