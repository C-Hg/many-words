import { GREEN_THRESHOLD, GOLD_THRESHOLD } from "../constants";
import { UpdatedWordScores } from "../interfaces/wordScores.interface";

/**
 * Given global scores of a word and the result of the exercise for one word,
 * produces a wordResult object to update the user stats
 */
const updateWordScores = (
  globalScore: number,
  correctAnswers: number,
  wrongAnswers: number,
  isAnswerCorrect: boolean
): UpdatedWordScores => {
  let updatedGlobalScore;
  let updatedCorrectAnswers = correctAnswers;
  let updatedWrongAnswers = wrongAnswers;
  let greenCount = 0;
  let goldCount = 0;

  // the user answered correctly
  if (isAnswerCorrect) {
    updatedGlobalScore = globalScore + 1;
    updatedCorrectAnswers = correctAnswers + 1;
    if (
      updatedGlobalScore >= GREEN_THRESHOLD &&
      updatedGlobalScore < GOLD_THRESHOLD &&
      globalScore < GREEN_THRESHOLD
    ) {
      // this word is now green
      greenCount = 1;
    } else if (
      updatedGlobalScore >= GOLD_THRESHOLD &&
      globalScore < GOLD_THRESHOLD
    ) {
      // this word was green and is now gold
      greenCount = -1;
      goldCount = 1;
    }
    // the user did not answer correctly
  } else {
    updatedGlobalScore = globalScore - 0.5;
    updatedWrongAnswers = wrongAnswers + 1;
    if (
      updatedGlobalScore >= GREEN_THRESHOLD &&
      updatedGlobalScore < GOLD_THRESHOLD &&
      globalScore >= GOLD_THRESHOLD
    ) {
      // this word was gold and is now green
      greenCount = 1;
      goldCount = -1;
    } else if (
      updatedGlobalScore < GREEN_THRESHOLD &&
      globalScore >= GREEN_THRESHOLD
    ) {
      // this word was green and is not any more
      greenCount = -1;
    }
  }

  return {
    updatedGlobalScore,
    updatedCorrectAnswers,
    updatedWrongAnswers,
    greenCount,
    goldCount,
  };
};

export default updateWordScores;
