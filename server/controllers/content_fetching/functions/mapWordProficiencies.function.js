module.exports = function mapWordProficiencies(wordProficiencies) {
  return wordProficiencies.map(val => {
    if (val === null) {
      return null;
    }
    let weakestForms = [];
    let lowestIndex = 100;
    for (let form of val.proficiencyIndexes) {
      if (form.proficiency < lowestIndex) {
        lowestIndex = form.proficiency;
        weakestForms = [form];
      } else if (form.proficiency === lowestIndex) {
        weakestForms.push(form);
      }
    }
    return weakestForms;
  });
};
