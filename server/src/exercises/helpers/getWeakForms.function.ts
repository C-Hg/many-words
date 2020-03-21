import WordStats from "../../user/stats/words/interfaces/wordStats.interface";
import FormStats from "../../user/stats/words/interfaces/formStats.interface";
import logger from "../../logger";

/**
 * getWeakForms: for each word, returns the weakest forms in an array of objects
 * @param {Array} wordScores
 * @return {Array} weakForms
 */
const getWeakForms = (wordScores: WordStats[]): (FormStats[] | null)[] => {
  const wordsWeakForms = wordScores.map(wordScore => {
    if (!wordScore) {
      return null;
    }
    let weakestForms: FormStats[] = [];
    let lowestIndex = 10000;
    wordScore.statsByForm.forEach(form => {
      if (form.score < lowestIndex) {
        lowestIndex = form.score;
        weakestForms = [form];
      } else if (form.score === lowestIndex) {
        weakestForms.push(form);
      }
    });
    return weakestForms;
  });
  // logger.debug(
  //   `[getWeakForms] weakestForms: ${JSON.stringify(wordsWeakForms)}`
  // );
  return wordsWeakForms;
};

export default getWeakForms;
