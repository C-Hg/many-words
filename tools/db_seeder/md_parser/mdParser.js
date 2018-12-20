//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./mdRegex");
const {
  verifyDataCompleteness
} = require("./functions/verifyDataCompleteness.function");
const { fetchEnWords } = require("./functions/fetchEnWords.function");
const { fetchFrWords } = require("./functions/fetchFrWords.function");

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
  let en_words = fetchEnWords(document);
  console.log(en_words);

  //FR data
  let fr_name = document.match(regex.frName);
  let fr_words = fetchFrWords(document);
  console.log(fr_words);

  if (!en_words || !fr_words) {
    return false;
  }

  // if error returned : escape with error message instead of returning object
  /*

  if (
    verifyDataCompleteness(
      en_name,
      fr_name,
      type,
      lessonName,
    )
  ) {
    let newWord = new word(en_name, fr_name, type, lessonName, en, fr);
    newWord.uniqueForm = hasUniqueForm;
    return newWord;
  }
  return false;
  */
};
