module.exports = function updateStatsByForm(wordStats, exerciseResult) {
  for (let selectedForm of wordStats.stats_by_form) {
    if (
      selectedForm.language === exerciseResult[1] &&
      selectedForm.form === exerciseResult[2]
    ) {
      if (exerciseResult[3]) {
        selectedForm.score += 1;
        wordStats.global_score += 1;
        wordStats.correctAnswers++;
      } else {
        selectedForm.score -= 0.5;
        wordStats.global_score -= 0.5;
        wordStats.wrongAnswers++;
      }
      break;
    }
  }
  return wordStats;
};
