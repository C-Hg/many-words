import randomPicker from "./RandomPicker.function";

const formattedWord = function(sourceLanguage, fr, en) {
  this.sourceLanguage = sourceLanguage;
  this.fr = fr;
  this.en = en;
};

const frArticles = {
  definite: {
    masc_sing: "le ",
    masc_plur: "les ",
    fem_sing: "la ",
    fem_plur: "les "
  },
  indefinite: {
    masc_sing: "un ",
    masc_plur: "des ",
    fem_sing: "une ",
    fem_plur: "des "
  }
};

const enArticles = {
  definite: {
    sing: "the",
    plur: "the"
  },
  indefinite: {
    sing: "a",
    plur: ""
  }
};

exports.fr_en_wordSelector = function(wordsToSelect) {
  let n = 0;
  let preparedWords = [];

  while (n < wordsToSelect.length) {
    let fr = [];
    let en = [];
    let word = wordsToSelect[n];
    let sourceLanguage = randomPicker(["fr", "en"]);

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
      let form = randomPicker(word[sourceLanguage][0].acceptedForms);
      let fr_article = "";
      let en_article = "";

      //outsource function article selector
      let articleForm = "";
      if (word.hasArticle) {
        articleForm = randomPicker(["definite, indefinite"]);
      }

      if (sourceLanguage === "fr") {
        let fr_form = form;
        let en_form = "";
        if (fr_form === "masc_sing" || "fem_sing") {
          en_form = "sing";
        } else {
          en_form = "plur";
        }

        if (articleForm) {
          if (
            word.fr[0].isLApostrophe &&
            articleForm === "definite" &&
            fr_form === ("masc_sing" || "fem_sing")
          ) {
            fr_article = "l'";
          } else {
            fr_article = frArticles[articleForm][fr_form];
          }
        }
        fr = `${fr_article}${word.fr[0][fr_form]}`;

        for (let a = 0; a < word.en.length; a++) {
          if (articleForm) {
            if (
              word.en[a].isArticleAn &&
              articleForm === "indefinite" &&
              en_form === "sing"
            ) {
              en_article = "an";
            } else {
              en_article = enArticles[articleForm][en_form];
            }
          }
          en.push(`${en_article} ${word.en[a][en_form]}`.trimLeft());
        }
      } else {
        let fr_forms = "";
        let en_form = form;

        if (en_form === "sing") {
          fr_forms = ["masc_sing", "fem_sing"];
        } else {
          fr_forms = ["masc_plur", "fem_plur"];
        }
        //outsource in select en_article

        if (articleForm) {
          if (
            word.en[0].isArticleAn &&
            articleForm === "indefinite" &&
            en_form === "sing"
          ) {
            en_article = "an";
          } else {
            en_article = enArticles[articleForm][en_form];
          }
        }
        en = `${en_article} ${word.en[0][en_form]}`.trimLeft();

        for (let a = 0; a < word.fr.length; a++) {
          for (let b = 0; b < 2; b++) {
            if (word.fr[a][fr_forms[b]]) {
              if (articleForm) {
                if (
                  word.fr[a].isLApostrophe &&
                  articleForm === "definite" &&
                  en_form === "sing"
                ) {
                  fr_article = "l'";
                } else {
                  fr_article = frArticles[articleForm][fr_forms[b]];
                }
              }
              fr.push(`${fr_article}${word.fr[0][fr_forms[b]]}`);
            }
          }
        }
      }
    }

    preparedWords.push(new formattedWord(sourceLanguage, fr, en));
  }
  return preparedWords;
};
