export interface FrenchNumberAndGender {
  number: "singular" | "plural";
  gender: "masculine" | "feminine";
  value: string;
}

export default interface FrenchForms {
  uniqueForm: string;
  singularMasculine: FrenchNumberAndGender;
  singularFeminine: FrenchNumberAndGender;
  pluralMasculine: FrenchNumberAndGender;
  pluralFeminine: FrenchNumberAndGender;
}
