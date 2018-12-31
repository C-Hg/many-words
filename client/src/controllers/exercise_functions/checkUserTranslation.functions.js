exports.checkUserTranslation = function(userTranslation, words) {
  let correctTranslations;
  if (words.sourceLanguage === "fr") {
    correctTranslations = words.en;
  } else {
    correctTranslations = words.fr;
  }

  for (let correctTranslation of correctTranslations) {
    if (correctTranslation === userTranslation) {
      return true;
    }
  }
  return false;
};
