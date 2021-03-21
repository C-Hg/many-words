import { WordStats } from "./wordStats.interface";

export default interface WordResult {
  wordStats: WordStats;
  isNew?: boolean;
  greenCount?: number;
  goldCount?: number;
  scoreVariation?: number;
}
