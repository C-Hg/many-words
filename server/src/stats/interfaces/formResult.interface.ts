import { EnglishForms, FrenchForms, Languages } from "../../graphql/types";

interface FormResult {
  englishName: string;
  form: EnglishForms | FrenchForms;
  isAnswerCorrect: boolean;
  language: Languages;
}

export default FormResult;
