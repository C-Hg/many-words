//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./mdRegex");
const {
  verifyDataCompleteness
} = require("./functions/verifyDataCompleteness.function");
const { fetchEnWords } = require("./functions/fetchEnWords.function");

class word {
  constructor(en_name, fr_name, lessonName, type, fr, en) {
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

exports.extractData = function(document) {
  //general data
  let type = document.match(regex.type);
  let lessonName = document.match(regex.lesson);
  let hasUniqueForm = document.match(regex.uniqueForm);

  //EN data
  let en_name = document.match(regex.enName);
  let en_words = fetchEnWords(document); // fetch words
  console.log(en_words);

  // if error returned : escape with error message instead of returning object
  /*
  //FR data
  let fr_name = document.match(regex.frName);
  let fr_words = [];

  let enSingMain = document.match(regex.enSingMain);
  let isAnMain = document.match(regex.isAnMain);
  let isAnAlt1 = document.match(regex.isAnAlt1);
  let isAnAlt2 = document.match(regex.isAnAlt2);
  let isAnAlt3 = document.match(regex.isAnAlt3);

  let fr_uniqueMain = document.match(regex.frUniqueMain);
  let en_uniqueMain = document.match(regex.enUniqueMain);

  if (
    verifyDataCompleteness(
      en_name,
      fr_name,
      type,
      lessonName,
      en_words,
      fr_words
    )
  ) {
    let newWord = new word(en_name, fr_name, type, lessonName, en, fr);
    newWord.uniqueForm = hasUniqueForm;
    return newWord;
  }
  return false;
  */
};
