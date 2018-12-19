// the content of fr_words and en_words is checked previously, when fetching data from the Markdown file
// see fetchEnWords.function.js and checkEnFormat.function.js

exports.verifyDataCompleteness = function(en_name, fr_name, type, lessonName) {
  if (!en_name || !fr_name || !type || !lessonName) {
    return false;
  }
  return true;
};
