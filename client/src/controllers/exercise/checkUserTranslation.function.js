import getTranslationsWithoutArticles from "./getTranslationsWithoutArticles.function";

function checkUserTranslation(userTranslation, words) {
  let isUserTranslationCorrect = false;
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
      correctTranslationsWithoutArticles.forEach(correctTranslation => {
        if (correctTranslation === userTranslation.trim()) {
          isUserTranslationCorrect = true;
        }
      });
    }
  }

  // checks with articles
  correctTranslations.forEach(correctTranslation => {
    if (correctTranslation === userTranslation.trim()) {
      isUserTranslationCorrect = true;
    }
  });

  return [isUserTranslationCorrect, correctTranslations[0]];
}

export default checkUserTranslation;

/* example form of words

{
  selectedForm: ["wild"(enName), "fr", "unique_form"]     
  en: ["wild"], 
  fr: ["sauvage", "sauvages"]
}

the source language returns the only form submitted to the user
the function checks that user input matches one of the possible translations
*/
