import { WordStats } from "../../stats/interfaces/wordStats.interface";

const sortWordStats = (wordStats: WordStats[]): WordStats[] => {
  return wordStats.sort((a, b) => {
    return a.globalScore - b.globalScore;
  });
};

export default sortWordStats;
