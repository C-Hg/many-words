//fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE

const word = function(
  en_name,
  fr_name,
  lessonName,
  hasUniqueForm,
  type,
  fr,
  en
) {
  (this.en_name = en_name),
    (this.fr_name = fr_name),
    (this.lessonName = lessonName);
  (this.hasUniqueForm = hasUniqueForm),
    (this.type = type),
    (this.fr = fr),
    (this.en = en);
};

const regex = require("./mdRegex");

exports.extractData = function(document) {
  let lessonName = document.match(regex.lesson);
  let enSingMain = document.match(regex.enSingMain);

  let isAnMain = document.match(regex.isAnMain);
  let isAnAlt1 = document.match(regex.isAnAlt1);
  let isAnAlt2 = document.match(regex.isAnAlt2);
  let isAnAlt3 = document.match(regex.isAnAlt3);

  let fr_name = document.match(regex.frName);
  let en_name = document.match(regex.enName);
  let fr_uniqueMain = document.match(regex.frUniqueMain);
  let en_uniqueMain = document.match(regex.enUniqueMain);

  console.log(lessonName);
};
