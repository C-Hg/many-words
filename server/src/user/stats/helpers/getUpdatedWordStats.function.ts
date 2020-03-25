const getUpdatedWordStats = async (allWordStats, exerciseResults) => {
  // TODO: replace array positions by object in exerciseResults
  const updatedWordStats = allWordStats.map((wordStats, wordIndex) => {
    const wasUserCorrect = exerciseResults[wordIndex][3];

    // updates the score by form
    const updatedStatsByForm = wordStats.statsByForm.map(statsByForm => {
      if (
        statsByForm.language === exerciseResults[wordIndex][1] &&
        statsByForm.form === exerciseResults[wordIndex][2]
      ) {
        let updatedScore;
        if (wasUserCorrect) {
          updatedScore = statsByForm.score + 1;
        } else {
          updatedScore = statsByForm.score - 0.5;
        }
        return { ...statsByForm, score: updatedScore };
      }
      return statsByForm;
    });

    // updates the global scores for the word
    let updatedGlobalScore = wordStats.globalScore;
    let updatedCorrectAnswers = wordStats.correctAnswers;
    let updatedWrongAnswers = wordStats.wrongAnswers;
    if (wasUserCorrect) {
      updatedGlobalScore += 1;
      updatedCorrectAnswers += 1;
    } else {
      updatedGlobalScore -= 0.5;
      updatedWrongAnswers += 1;
    }

    return {
      ...wordStats,
      statsByForm: updatedStatsByForm,
      globalScore: updatedGlobalScore,
      correctAnswers: updatedCorrectAnswers,
      wrongAnswers: updatedWrongAnswers,
    };
  });

  return updatedWordStats;
};

export default getUpdatedWordStats;
