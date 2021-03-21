import { WORD_GREEN_THRESHOLD, WORD_GOLD_THRESHOLD } from "../../constants";
import { UpdatedWordScores } from "../../interfaces/wordScores.interface";

/**
 * Given global scores of a word and the result of the exercise for one word,
 * produces a wordResult object to update the user stats
 */
const updateWordScores = (
  score: number,
  correctAnswers: number,
  wrongAnswers: number,
  isAnswerCorrect: boolean
): UpdatedWordScores => {
  let updatedScore;
  let updatedCorrectAnswers = correctAnswers;
  let updatedWrongAnswers = wrongAnswers;
  let greenCount = 0;
  let goldCount = 0;

  // the user answered correctly
  if (isAnswerCorrect) {
    updatedScore = score + 1;
    updatedCorrectAnswers = correctAnswers + 1;
    if (
      updatedScore >= WORD_GREEN_THRESHOLD &&
      updatedScore < WORD_GOLD_THRESHOLD &&
      score < WORD_GREEN_THRESHOLD
    ) {
      // this word is now green
      greenCount = 1;
    } else if (
      updatedScore >= WORD_GOLD_THRESHOLD &&
      score < WORD_GOLD_THRESHOLD
    ) {
      // this word was green and is now gold
      greenCount = -1;
      goldCount = 1;
    }
    // the user did not answer correctly
  } else {
    updatedScore = score - 0.5;
    updatedWrongAnswers = wrongAnswers + 1;
    if (
      updatedScore >= WORD_GREEN_THRESHOLD &&
      updatedScore < WORD_GOLD_THRESHOLD &&
      score >= WORD_GOLD_THRESHOLD
    ) {
      // this word was gold and is now green
      greenCount = 1;
      goldCount = -1;
    } else if (
      updatedScore < WORD_GREEN_THRESHOLD &&
      score >= WORD_GREEN_THRESHOLD
    ) {
      // this word was green and is not any more
      greenCount = -1;
    }
  }

  return {
    updatedScore,
    updatedCorrectAnswers,
    updatedWrongAnswers,
    greenCount,
    goldCount,
  };
};

export default updateWordScores;
