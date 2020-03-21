import FrenchForms from "./frenchForms.interface";

export default interface FrenchWord {
  uniqueForm?: string;
  singularMasculine?: string;
  singularFeminine?: string;
  pluralMasculine?: string;
  pluralFeminine?: string;
  acceptedForms: (keyof FrenchForms)[];
}
