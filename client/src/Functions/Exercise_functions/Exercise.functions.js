exports.checkUserTranslation = function(userTranslation, correctTranslations) {
  if (userTranslation === correctTranslations) {
    return true;
  }
  return false;
};
