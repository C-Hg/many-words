import getWordScoreVariation from "./getWordScoreVariation.function";
import updateFormsStats from "./updateFormsStats.function";
import updateWordScores from "./updateWordScores.function";

import FormResult from "../../interfaces/formResult.interface";
import WordResult from "../../interfaces/wordResult.interface";

// TODO: test me with apollo server integration module
/**
 * Updates the stats of an array of wordsResults, after an exercise
 */
const getUpdatedWordsResults = (
  wordsResults: WordResult[],
  formResults: FormResult[]
): WordResult[] => {
  const updatedWordsResults = wordsResults.map((wordResult, wordIndex) => {
    // for the wordResult of each word
    const formResult = formResults[wordIndex];
    const { isAnswerCorrect } = formResults[wordIndex];
    const { wordStats, isNew } = wordResult;
    const { globalScore, correctAnswers, wrongAnswers, formsStats } = wordStats;

    // updates the score by form
    const updatedFormsStats = updateFormsStats(formsStats, formResult);

    // updates the global scores for the word
    const updatedWordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      isAnswerCorrect
    );
    const {
      updatedGlobalScore,
      updatedCorrectAnswers,
      updatedWrongAnswers,
      greenCount,
      goldCount,
    } = updatedWordScores;
    const globalScoreVariation = getWordScoreVariation(
      wordStats.globalScore,
      updatedGlobalScore
    );

    // construct the new wordStats object
    const updatedWordStats = {
      ...wordStats,
      formsStats: updatedFormsStats,
      globalScore: updatedGlobalScore,
      correctAnswers: updatedCorrectAnswers,
      wrongAnswers: updatedWrongAnswers,
    };

    // and return the whole wordResult object
    return {
      wordStats: updatedWordStats,
      isNew,
      greenCount,
      goldCount,
      globalScoreVariation,
    };
  });

  return updatedWordsResults;
};

export default getUpdatedWordsResults;
