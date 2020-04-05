import FormResult from "../interfaces/formResult.interface";
import FormStats from "../interfaces/formStats.interface";

/**
 * Given the formStats and the formResult for one word,
 * updates the stats of the form tested during the exercise
 */
const updateFormsStats = (
  formsStats: FormStats[],
  formResult: FormResult
): FormStats[] => {
  return formsStats.map((formStats) => {
    const { language, form, isAnswerCorrect } = formResult;
    if (formStats.language === language && formStats.form === form) {
      let updatedScore;
      if (isAnswerCorrect) {
        updatedScore = formStats.score + 1;
      } else {
        updatedScore = formStats.score - 0.5;
      }
      return { ...formStats, score: updatedScore };
    }
    return formStats;
  });
};

export default updateFormsStats;
