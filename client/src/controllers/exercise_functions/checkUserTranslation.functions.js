exports.checkUserTranslation = function(userTranslation, words) {
  let correctTranslations;
  if (words.sourceLanguage === "fr") {
    correctTranslations = words.en;
  } else {
    correctTranslations = words.fr;
  }

  for (let correctTranslation of correctTranslations) {
    if (correctTranslation === userTranslation) {
      return [true];
    }
  }
  return [false, correctTranslations[0]];
};

/*example form of words

{
  sourceLanguage: "en", //en or fr
  en: ["wild"], 
  fr: ["sauvage", "sauvages"]
}

the source language returns the only form submitted to the user
the function checks that user input matches one of the possible translations
*/
