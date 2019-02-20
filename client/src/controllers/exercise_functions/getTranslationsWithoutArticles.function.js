let allLettersAndNumbers = "[0-9a-zàéèùâêîôûäëïöüç'\\-]+";
let separateWordfromArticleRegex = new RegExp(
  "(?:les\\s|des\\s)((?:" + allLettersAndNumbers + "\\s?)*)",
  "i"
);

function getTranslationsWithoutArticles(correctTranslations) {
  let translationsWithoutArticles = [];
  for (let correctTranslation of correctTranslations) {
    let translation = correctTranslation.match(separateWordfromArticleRegex);
    translationsWithoutArticles.push(translation[1]);
  }
  return translationsWithoutArticles;
}

export default getTranslationsWithoutArticles;
