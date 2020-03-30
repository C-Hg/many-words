import { Languages } from "./formStats.interface";

import EnglishForms from "../../exercises/interfaces/englishForms.interface";
import FrenchForms from "../../exercises/interfaces/frenchForms.interface";

interface FormResult {
  englishName: string;
  form: keyof EnglishForms | keyof FrenchForms;
  isAnswerCorrect: boolean;
  language: Languages;
}

export default FormResult;
