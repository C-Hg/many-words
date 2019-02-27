module.exports = function sortWordStats(wordStats) {
  let sorted = wordStats.sort((a, b) => {
    return a.global_score - b.global_score;
  });
  return sorted;
};
