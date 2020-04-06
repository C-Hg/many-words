import WordResult from "../../interfaces/wordResult.interface";
import { WordsVariation } from "../../interfaces/wordScores.interface";
/**
 * Reduces the global variations for each category of words
 */
const reduceWordsVariation = (wordResults: WordResult[]): WordsVariation => {
  const studiedWordsVariation = wordResults.reduce((newWords, wordResult) => {
    if (wordResult.isNew) {
      return newWords + 1;
    }
    return newWords;
  }, 0);

  const greenWordsVariation = wordResults.reduce(
    (greenWordsVariation, wordResult) => {
      if (!wordResult.greenCount) {
        return greenWordsVariation;
      }
      return greenWordsVariation + wordResult.greenCount;
    },
    0
  );

  const goldWordsVariation = wordResults.reduce(
    (goldWordsVariation, wordResult) => {
      if (!wordResult.goldCount) {
        return goldWordsVariation;
      }
      return goldWordsVariation + wordResult.goldCount;
    },
    0
  );

  return {
    studiedWordsVariation,
    greenWordsVariation,
    goldWordsVariation,
  };
};

export default reduceWordsVariation;
