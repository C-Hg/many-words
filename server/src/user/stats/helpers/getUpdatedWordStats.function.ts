import ExerciseResult from "../interfaces/exerciseResult.interface";
import WordStats from "../interfaces/wordStats.interface";
import WordStatsToUpdate from "../interfaces/wordStatsToUpdate.interface";

// TODO: test me :)
// TODO: remove Partial as a return type once passport-session is removed, or maybe this is a bad type matching between model and interface
// note that the WordStats object is fetched as an object from mongo
const getUpdatedWordStats = (
  wordsStatsToUpdate: WordStatsToUpdate[],
  exerciseResults: ExerciseResult[]
): Partial<WordStats>[] => {
  const updatedWordStats = wordsStatsToUpdate.map(
    (wordStatsToUpdate, wordIndex) => {
      const { isAnswerCorrect } = exerciseResults[wordIndex];
      const { wordStats } = wordStatsToUpdate;

      // TODO: move to its own file
      // updates the score by form
      const updatedStatsByForm = wordStats.statsByForm.map((statsByForm) => {
        if (
          statsByForm.language === exerciseResults[wordIndex].language &&
          statsByForm.form === exerciseResults[wordIndex].form
        ) {
          let updatedScore;
          if (isAnswerCorrect) {
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
      // TODO : add isNowGreen, isNowGold, wasBlue, wasGreen, wasGold
      // and move to its own file
      if (isAnswerCorrect) {
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
    }
  );

  return updatedWordStats;
};

export default getUpdatedWordStats;
