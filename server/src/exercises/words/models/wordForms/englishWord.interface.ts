import EnglishForms from "./englishForms.interface";

export default interface EnglishWord {
  uniqueForm?: string;
  singular?: string;
  plural?: string;
  acceptedForms: (keyof EnglishForms)[];
}
