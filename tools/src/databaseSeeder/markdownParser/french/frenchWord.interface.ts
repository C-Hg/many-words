export type FrenchForms =
  "uniqueForm" |
  "singularMasculine" |
  "singularFeminine" |
  "pluralMasculine" |
  "pluralFeminine"


export type FrenchWord = {
  [K in FrenchForms]?: string
};
