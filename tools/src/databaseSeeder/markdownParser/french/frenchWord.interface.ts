export type FrenchForms =
  | "uniqueForm"
  | "singularMasculine"
  | "singularFeminine"
  | "pluralMasculine"
  | "pluralFeminine";

export type FrenchFormValue = {
  form: FrenchForms;
  values: string[];
};

export type FrenchWord = FrenchFormValue[];
