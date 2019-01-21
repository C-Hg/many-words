module.exports = function updateEfficiencyIndexes(proficiencyStats, wordStats) {
  for (let selectedForm of proficiencyStats.proficiencyIndexes) {
    if (
      selectedForm.language === wordStats[1] &&
      selectedForm.form === wordStats[2]
    ) {
      if (wordStats[3]) {
        selectedForm.proficiency += 1;
        proficiencyStats.generalProficiency += 1;
        proficiencyStats.correctAnswers++;
      } else {
        selectedForm.proficiency -= 0.5;
        proficiencyStats.generalProficiency -= 0.5;
        proficiencyStats.wrongAnswers++;
      }
      break;
    }
  }
  return proficiencyStats;
};
