const sortWordStats = wordStats => {
  return wordStats.sort((a, b) => {
    return a.globalScore - b.globalScore;
  });
};

export default sortWordStats;
