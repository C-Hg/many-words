import CONSTANTS from "../constants";
import WordScores, {
  UpdatedWordScores,
} from "../interfaces/wordScores.interface";

/**
 * Given global scores of a word and the result of the exercise for one word,
 * produces a wordResult object to update the user stats
 */
const updateWordScores = (
  wordScores: WordScores,
  isAnswerCorrect: boolean
): UpdatedWordScores => {
  const { globalScore, correctAnswers, wrongAnswers } = wordScores;

  let updatedGlobalScore;
  let updatedCorrectAnswers = correctAnswers;
  let updatedWrongAnswers = wrongAnswers;
  let greenCount = 0;
  let goldCount = 0;
  let globalScoreVariation;

  // the user answered correctly
  if (isAnswerCorrect) {
    updatedGlobalScore = globalScore + 1;
    updatedCorrectAnswers = correctAnswers + 1;
    globalScoreVariation = 1;
    if (
      updatedGlobalScore >= CONSTANTS.GREEN_THRESHOLD &&
      updatedGlobalScore < CONSTANTS.GOLD_THRESHOLD &&
      globalScore < CONSTANTS.GREEN_THRESHOLD
    ) {
      // this word is now green
      greenCount = 1;
    } else if (
      updatedGlobalScore >= CONSTANTS.GOLD_THRESHOLD &&
      globalScore < CONSTANTS.GOLD_THRESHOLD
    ) {
      // this word was green and is now gold
      greenCount = -1;
      goldCount = 1;
    }
    // the user did not answer correctly
  } else {
    updatedGlobalScore = globalScore - 0.5;
    updatedWrongAnswers = wrongAnswers + 1;
    globalScoreVariation = -0.5;
    if (
      updatedGlobalScore >= CONSTANTS.GREEN_THRESHOLD &&
      updatedGlobalScore < CONSTANTS.GOLD_THRESHOLD &&
      globalScore >= CONSTANTS.GOLD_THRESHOLD
    ) {
      // this word was gold and is now green
      greenCount = 1;
      goldCount = -1;
    } else if (
      updatedGlobalScore < CONSTANTS.GREEN_THRESHOLD &&
      globalScore >= CONSTANTS.GREEN_THRESHOLD
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
    globalScoreVariation,
  };
};

export default updateWordScores;
