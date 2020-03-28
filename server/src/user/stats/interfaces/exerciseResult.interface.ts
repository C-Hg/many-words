import FormStats from "./formStats.interface";

interface ExerciseResult extends FormStats {
  englishName: string;
  isAnswerCorrect: boolean;
}

export default ExerciseResult;
