export const allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
export const separateWordFromArticleRegex = new RegExp(
  `(?:les\\s|des\\s)((?:${allLettersAndNumbers}\\s?)*)`,
  "i"
);
