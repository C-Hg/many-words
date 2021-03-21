import getWordScoreVariation from "./getWordScoreVariation.function";
import updateFormsStats from "./updateFormsStats.function";
import updateWordScores from "./updateWordScores.function";

import FormResult from "../../interfaces/formResult.interface";
import WordResult from "../../interfaces/wordResult.interface";

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
    const { score, correctAnswers, wrongAnswers, formsStats } = wordStats;

    // updates the score by form
    const updatedFormsStats = updateFormsStats(formsStats, formResult);

    // updates the global scores for the word
    const updatedWordScores = updateWordScores(
      score,
      correctAnswers,
      wrongAnswers,
      isAnswerCorrect
    );
    const {
      updatedScore,
      updatedCorrectAnswers,
      updatedWrongAnswers,
      greenCount,
      goldCount,
    } = updatedWordScores;
    const globalScoreVariation = getWordScoreVariation(
      wordStats.score,
      updatedScore
    );

    // construct the new wordStats object
    const updatedWordStats = {
      ...wordStats,
      formsStats: updatedFormsStats,
      score: updatedScore,
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
