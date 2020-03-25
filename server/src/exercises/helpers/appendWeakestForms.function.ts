import WordStats from "../../user/stats/interfaces/wordStats.interface";
import FormStats from "../../user/stats/interfaces/formStats.interface";
import Word from "../interfaces/word.interface";

/**
 * For each word, append its weakest forms
 * @param {Array} wordStats
 * @return {Array} weakForms
 */
const appendWeakestForms = (
  words: Word[],
  wordStats: (WordStats | null)[]
): Word[] => {
  const wordsWithWeakestForms = wordStats.map((wordStats, index) => {
    let weakestForms: FormStats[] = [];
    if (wordStats !== null) {
      let lowestIndex = 10000;
      wordStats.statsByForm.forEach(form => {
        if (form.score < lowestIndex) {
          lowestIndex = form.score;
          weakestForms = [form];
        } else if (form.score === lowestIndex) {
          weakestForms.push(form);
        }
      });
    }
    words[index].weakestForms = weakestForms;
    return words[index];
  });
  // logger.debug(
  //   `[appendWeakestForms] weakestForms: ${JSON.stringify(wordsWeakForms)}`
  // );
  return wordsWithWeakestForms;
};

export default appendWeakestForms;
