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

exports.extractData = function(document) {
  //general data
  let type = document.match(regex.type);
  let lessonName = document.match(regex.lesson);
  let hasUniqueForm = document.match(regex.uniqueForm);
  console.log(hasUniqueForm);

  //EN data
  let en_name = document.match(regex.enName);
  let en_words = fetchEnWords(document);

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
    lessonName[0],
    type[0],
    en_words,
    fr_words
  );
  newWord.uniqueForm = hasUniqueForm[0];
  return newWord;
};
