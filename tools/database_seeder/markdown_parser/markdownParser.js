//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./markdownRegex");
const { fetchEnWords } = require("./functions/fetchEnWords.function");
const { fetchFrWords } = require("./functions/fetchFrWords.function");

function word(en_name, fr_name, hasUniqueForm, lessonAndTheme, type, en, fr) {
  this.en_name = en_name;
  this.fr_name = fr_name;
  this.lesson = lessonAndTheme[0];
  this.theme = lessonAndTheme[1];
  this.type = type;
  this.en = en;
  this.fr = fr;

  if (hasUniqueForm === "true") {
    this.hasUniqueForm = true;
  }
}

// this function is the main controller that retrieves data from a markdown document

exports.extractData = function(document, lessonAndTheme) {
  //general data : regex fetching
  let type = document.match(regex.type);
  let hasUniqueForm = document.match(regex.uniqueForm);

  //EN data
  let en_name = document.match(regex.enName);
  let en_words = fetchEnWords(document); //gathering and validating data

  //FR data
  let fr_name = document.match(regex.frName);
  let fr_words = fetchFrWords(document);

  if (
    !en_words ||
    !fr_words ||
    !en_name ||
    !fr_name ||
    !type ||
    !lessonAndTheme[0] ||
    !lessonAndTheme[1]
  ) {
    console.error("\033[1;31m" + "Required parameter missing" + "\033[0;0m");
    return false;
  }

  let newWord = new word(
    en_name[0],
    fr_name[0],
    hasUniqueForm[0],
    lessonAndTheme,
    type[0],
    en_words,
    fr_words
  );
  return newWord;
};
