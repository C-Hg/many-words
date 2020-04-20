import { Languages } from "./formStats.interface";

import { EnglishForms, FrenchForms } from "../../graphql/types";

interface FormResult {
  englishName: string;
  form: keyof EnglishForms | keyof FrenchForms;
  isAnswerCorrect: boolean;
  language: Languages;
}

export default FormResult;
