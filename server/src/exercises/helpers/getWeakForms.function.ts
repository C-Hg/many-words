import WordStats from "../../user/stats/words/interfaces/wordStats.interface";
import FormStats from "../../user/stats/words/interfaces/formStats.interface";

/**
 * For each word, returns the weakest forms in an array of objects
 * @param {Array} wordStats
 * @return {Array} weakForms
 */
const getWeakForms = (wordStats: WordStats[]): (FormStats[] | null)[] => {
  const wordsWeakForms = wordStats.map(wordStats => {
    if (!wordStats) {
      return null;
    }
    let weakestForms: FormStats[] = [];
    let lowestIndex = 10000;
    wordStats.statsByForm.forEach(form => {
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
