//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./mdRegex");
const { fetchEnWords } = require("./functions/fetchEnWords.function");
const { fetchFrWords } = require("./functions/fetchFrWords.function");

class word {
  constructor(en_name, fr_name, lessonName, type, en, fr) {
    this.en_name = en_name;
    this.fr_name = fr_name;
    this.lessonName = lessonName;
    this.type = type;
    this.fr = fr;
    this.en = en;
  }
  set uniqueForm(hasUniqueForm) {
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
    console.log("required parameter missing");
    return false;
  }

  let newWord = new word(
    en_name[0],
    fr_name[0],
    lessonName,
    type[0],
    en_words,
    fr_words
  );
  newWord.uniqueForm = hasUniqueForm[0];
  return newWord;
};