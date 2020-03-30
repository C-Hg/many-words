import updateFormsStats from "./updateFormsStats.function";
import updateWordStats from "./updateWordStats.function";

import FormResult from "../interfaces/formResult.interface";
import WordResult from "../interfaces/wordResult.interface";
import { WordStats } from "../interfaces/wordStats.interface";

// TODO: test me :)
// TODO: remove Partial as a return type once passport-session is removed, or maybe this is a bad type matching between model and interface
// note that the WordStats object is fetched as an object from mongo (is it?)
/**
 * Updates the stats of an array of wordsResults, after an exercise
 */
const getUpdatedWordStats = (
  wordsResults: WordResult[],
  formResults: FormResult[]
): WordStats[] => {
  // TODO: change schema and interfaces formsStats -> formsStats
  const updatedWordStats = wordsResults.map((wordResult, wordIndex) => {
    // for the wordResult of each word
    const formResult = formResults[wordIndex];
    const { isAnswerCorrect } = formResults[wordIndex];
    const { wordStats } = wordResult;
    const { formsStats } = wordStats;

    // updates the score by form
    const updatedFormsStats = updateFormsStats(formsStats, formResult);

    // updates the global scores for the word
    let updatedGlobalScore = wordStats.globalScore;
    let updatedCorrectAnswers = wordStats.correctAnswers;
    let updatedWrongAnswers = wordStats.wrongAnswers;
    // TODO : add isNowGreen, isNowGold, wasBlue, wasGreen, wasGold
    // and move to its own file
    if (isAnswerCorrect) {
      updatedGlobalScore += 1;
      updatedCorrectAnswers += 1;
    } else {
      updatedGlobalScore -= 0.5;
      updatedWrongAnswers += 1;
    }

    return {
      ...wordStats,
      formsStats: updatedFormsStats,
      globalScore: updatedGlobalScore,
      correctAnswers: updatedCorrectAnswers,
      wrongAnswers: updatedWrongAnswers,
    };
  });

  return updatedWordStats;
};

export default getUpdatedWordStats;
