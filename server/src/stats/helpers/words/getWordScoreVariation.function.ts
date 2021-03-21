import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";

/**
 * Produces the score variation to update the lesson score
 * The score for a word cannot be negative for a lesson, nor exceed a fixed limit
 */
const getWordScoreVariation = (
  previousScore: number,
  newScore: number
): number => {
  if (previousScore < 0) {
    if (newScore <= 0) {
      // score was and is still negative, ignore it
      return 0;
    } else {
      // score was not counted, newScore equals the variation
      return newScore;
    }
  } else if (previousScore >= 0 && previousScore <= MAX_WORD_SCORE_IN_LESSON) {
    if (newScore <= 0) {
      // count only the difference between previousScore and 0
      return -previousScore;
    } else if (newScore < MAX_WORD_SCORE_IN_LESSON) {
      return newScore - previousScore;
    } else {
      // score is now maximum
      return MAX_WORD_SCORE_IN_LESSON - previousScore;
    }
  } else {
    // previousScore is > MAX_WORD_SCORE_IN_LESSON
    if (newScore < MAX_WORD_SCORE_IN_LESSON) {
      return newScore - MAX_WORD_SCORE_IN_LESSON;
    } else {
      // score was already maximum and still is, ignore it
      return 0;
    }
  }
};

export default getWordScoreVariation;
