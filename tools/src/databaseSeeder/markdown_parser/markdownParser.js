//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
const regex = require("./markdownRegex");
const { fetchEnWords } = require("./functions/fetchEnWords.function");
const { fetchFrWords } = require("./functions/fetchFrWords.function");

function word(enName, frName, hasUniqueForm, lessonAndTopic, type, en, fr) {
  this.enName = enName;
  this.frName = frName;
  this.lesson = lessonAndTopic[0];
  this.theme = lessonAndTopic[1];
  this.type = type;
  this.en = en;
  this.fr = fr;

  if (hasUniqueForm === "true") {
    this.hasUniqueForm = true;
  }
}

// this function is the main controller that retrieves data from a markdown document

const extractData = (document, lessonAndTopic) => {
  //general data : regex fetching
  let type = document.match(regex.type);
  let hasUniqueForm = document.match(regex.uniqueForm);

  //EN data
  let enName = document.match(regex.enName);
  let en_words = fetchEnWords(document); //gathering and validating data

  //FR data
  let frName = document.match(regex.frName);
  let fr_words = fetchFrWords(document);

  if (
    !en_words ||
    !fr_words ||
    !enName ||
    !frName ||
    !type ||
    !lessonAndTopic[0] ||
    !lessonAndTopic[1]
  ) {
    console.error("\033[1;31m" + "Required parameter missing" + "\033[0;0m");
    return false;
  }

  let newWord = new word(
    enName[0],
    frName[0],
    hasUniqueForm[0],
    lessonAndTopic,
    type[0],
    en_words,
    fr_words
  );
  return newWord;
};

export default extractData