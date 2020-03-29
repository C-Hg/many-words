import FormStats from "./formStats.interface";

interface FormResult extends FormStats {
  englishName: string;
  isAnswerCorrect: boolean;
}

export default FormResult;
