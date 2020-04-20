import { EnglishForms } from "../../graphql/types";

export default interface EnglishWord {
  uniqueForm?: string;
  singular?: string;
  plural?: string;
  acceptedForms: (keyof EnglishForms)[];
}
