const allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
const separateWordfromArticleRegex = new RegExp(
  `(?:les\\s|des\\s)((?:${allLettersAndNumbers}\\s?)*)`,
  "i"
);

function getTranslationsWithoutArticles(correctTranslations) {
  const correctTranslationsWithoutArticles = correctTranslations.map(
    correctTranslation => {
      const translation = correctTranslation.match(
        separateWordfromArticleRegex
      );
      return translation[1];
    }
  );

  return correctTranslationsWithoutArticles;
}

export default getTranslationsWithoutArticles;
