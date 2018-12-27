//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./mdRegex");
const { fetchEnWords } = require("./functions/fetchEnWords.function");
const { fetchFrWords } = require("./functions/fetchFrWords.function");

class word {
  constructor(en_name, fr_name, hasUniqueForm, lessonName, type, en, fr) {
    this.en_name = en_name;
    this.fr_name = fr_name;
    this.lessonName = lessonName;
    this.type = type;
    this.fr = fr;
    this.en = en;

    if (hasUniqueForm === "true") {
      this.hasUniqueForm = true;
    }
  }
}

// this function is the main controller that retrieves data from a markdown document

exports.extractData = function(document, lessonName) {
  //general data : regex fetching
  let type = document.match(regex.type);
  let hasUniqueForm = document.match(regex.uniqueForm);

  //EN data
  let en_name = document.match(regex.enName);
  let en_words = fetchEnWords(document); //gathering and validating data

  //FR data
  let fr_name = document.match(regex.frName);
  let fr_words = fetchFrWords(document);

  if (!en_words || !fr_words || !en_name || !fr_name || !type || !lessonName) {
    console.error("\033[1;31m" + "Required parameter missing" + "\033[0;0m");
    return false;
  }

  let newWord = new word(
    en_name[0],
    fr_name[0],
    hasUniqueForm[0],
    lessonName,
    type[0],
    en_words,
    fr_words
  );
  return newWord;
};
