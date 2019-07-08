const updateStatsByForm = async (wordStats, exerciseResult) => {
  console.log("WORDSTATS", wordStats);
  wordStats.forEach(word => {
    const { stats_by_form } = word;
    if (
      stats_by_form.language === exerciseResult[1] &&
      stats_by_form.form === exerciseResult[2]
    ) {
      if (exerciseResult[3]) {
        stats_by_form.score += 1;
        wordStats.global_score += 1;
        wordStats.correctAnswers++;
      } else {
        stats_by_form.score -= 0.5;
        wordStats.global_score -= 0.5;
        wordStats.wrongAnswers++;
      }
    }
  });
  return wordStats;
};

export default updateStatsByForm;
