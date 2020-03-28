import WordStats from "./wordStats.interface";

export default interface WordStatsToUpdate {
  wordStats: WordStats;
  isNew?: boolean;
  isNowGreen?: boolean;
  isNowGold?: boolean;
  wasBlue?: boolean;
  wasGreen?: boolean;
  wasGold?: boolean;
}
