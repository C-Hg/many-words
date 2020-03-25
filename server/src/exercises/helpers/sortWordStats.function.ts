import WordStats from "../../user/stats/interfaces/wordStats.interface";

const sortWordStats = (wordStats: WordStats[]): WordStats[] => {
  return wordStats.sort((a, b) => {
    return a.globalScore - b.globalScore;
  });
};

export default sortWordStats;
