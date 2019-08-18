/**
 * getWeakForms: for each word, returns the weakest forms
 * @param {Array} wordScores
 */
const getWeakForms = wordScores => {
  const wordsWeakForms = wordScores.map(val => {
    if (val === null) {
      return null;
    }
    let weakestForms = [];
    let lowestIndex = 10000;
    val.statsByForm.forEach(form => {
      if (form.score < lowestIndex) {
        lowestIndex = form.score;
        weakestForms = [form];
      } else if (form.score === lowestIndex) {
        weakestForms.push(form);
      }
    });

    return weakestForms;
  });
  console.debug(`getWeakForms, weakestForms: ${wordsWeakForms}`);
  return wordsWeakForms;
};

export default getWeakForms;
