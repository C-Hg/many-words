import random from "./RandomPicker.function";

const formattedWord = function(sourceLanguage, fr, en) {
  this.sourceLanguage = sourceLanguage;
  this.fr = fr;
  this.en = en;
};

const frArticles = {
  definite: {
    masc_sing: "le",
    masc_plur: "les",
    fem_sing: "la",
    fem_plur: "les"
  },
  indefinite: {
    masc_sing: "un",
    masc_plur: "des",
    fem_sing: "une",
    fem_plur: "des"
  }
};

exports.fr_en_wordSelector = function(wordsToSelect) {
  let n = 0;
  let fr = [];
  let en = [];
  let preparedWords = [];
  while (n < wordsToSelect.length) {
    let word = wordsToSelect[n];
    let sourceLanguage = random.randomPicker(word.languages);

    if (word.hasUniqueForm) {
      if (sourceLanguage === "fr") {
        fr = word.fr[0].uniqueForm;
        for (let a = 0; a < word.en; a++) {
          en.push(word.en[a].uniqueForm);
        }
      } else {
        en = word.en[0].uniqueForm;
        for (let a = 0; a < word.fr.length; a++) {
          fr.push(word.fr[a].uniqueForm);
        }
      }
    } else {
      let form = random.randomPicker(word[sourceLanguage][0].acceptedForms);
      let fr_article = "";
      let en_article = "";

      //outsource function article selector
      let article = false;
      if (word.hasArticle) {
        article = random.randomPicker(["definite, indefinite"]);
      }

      if (sourceLanguage === "fr") {
        let mode = "";
        switch (form) {
          case "masc_sing":
            mode = "sing";
            fr_article =
              article === "definite"
                ? word.fr[0].isLApostrophe
                  ? "l'"
                  : "le "
                : "un ";
            en_article = article === "definite" ? "the" : "a";
            break;

          case "fem_sing":
            mode = "sing";
            fr_article =
              article === "definite"
                ? word.fr[0].isLApostrophe
                  ? "l'"
                  : "la "
                : "une ";
            en_article = article === "definite" ? "the" : "a";
            break;

          case "masc_plur" || "fem_plur":
            mode = "plur";
            fr_article = article === "definite" ? "les " : "des ";
            en_article = article === "definite" ? "the" : "";
            break;

          default:
            break;
        }
        fr = `${fr_article}${word.fr[0][form]}`;
        for (let a = 0; a < word.en.length; a++) {
          if (en_article) {
            en.push(`${en_article} ${word.fr[0][mode]}`.trimLeft);
          } else {
            en.push(`${en_article} ${word.fr[0][mode]}`.trimLeft);
          }
        }
      } else {
        //sourceLanguage = "en"
      }
    }

    preparedWords.push(new formattedWord(sourceLanguage, fr, en));
  }
  return preparedWords;
};
