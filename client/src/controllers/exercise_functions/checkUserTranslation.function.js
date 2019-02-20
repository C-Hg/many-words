import getTranslationsWithoutArticles from "./getTranslationsWithoutArticles.function";

function checkUserTranslation(userTranslation, words) {
  let correctTranslations;
  let correctTranslationsWithoutArticles;
  if (words.selectedForm[1] === "fr") {
    correctTranslations = words.en;
  } else {
    correctTranslations = words.fr;
    // special case for english plurals : accepts correct answer
    // even if the article is not provided
    if (words.selectedForm[2] === "plur") {
      correctTranslationsWithoutArticles = getTranslationsWithoutArticles(
        correctTranslations
      );
      for (let correctTranslation of correctTranslationsWithoutArticles) {
        if (correctTranslation === userTranslation) {
          return [true];
        }
      }
    }
  }

  //checks with articles
  for (let correctTranslation of correctTranslations) {
    if (correctTranslation === userTranslation) {
      return [true];
    }
  }
  return [false, correctTranslations[0]];
}

export default checkUserTranslation;

/*example form of words

{
  selectedForm: ["wild"(en_name), "fr", "unique_form"]     
  en: ["wild"], 
  fr: ["sauvage", "sauvages"]
}

the source language returns the only form submitted to the user
the function checks that user input matches one of the possible translations
*/
