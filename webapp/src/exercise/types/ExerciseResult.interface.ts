import { EnglishForms, FrenchForms, Languages } from "../../graphql/types";

export interface ExerciseResult {
  englishName: string;
  form: EnglishForms | FrenchForms;
  isAnswerCorrect: boolean;
  language: Languages;
}
