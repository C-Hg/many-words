module.exports = function mapWordScores(wordScores) {
  return wordScores.map(val => {
    if (val === null) {
      return null;
    }
    let weakestForms = [];
    let lowestIndex = 100;
    for (let form of val.statsByForm) {
      if (form.score < lowestIndex) {
        lowestIndex = form.score;
        weakestForms = [form];
      } else if (form.score === lowestIndex) {
        weakestForms.push(form);
      }
    }
    return weakestForms;
  });
};
