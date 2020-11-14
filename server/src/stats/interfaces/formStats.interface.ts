import { Languages } from "../../graphql/learn.types";

interface FrenchForms {
  uniqueForm: string;
  singularMasculine: string;
  singularFeminine: string;
  pluralMasculine: string;
  pluralFeminine: string;
}

interface EnglishForms {
  uniqueForm: string;
  singular: string;
  plural: string;
}

export default interface FormStats {
  language: Languages;
  form: keyof EnglishForms | keyof FrenchForms;
  score: number;
}
