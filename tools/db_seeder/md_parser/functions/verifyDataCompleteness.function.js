exports.verifyDataCompleteness = function(
  en_name,
  fr_name,
  type,
  lessonName,
  en,
  fr
) {
  if (
    !en_name ||
    !fr_name ||
    !type ||
    !lessonName ||
    !en.length ||
    !fr.length
  ) {
    return false;
  }
  return true;
};
