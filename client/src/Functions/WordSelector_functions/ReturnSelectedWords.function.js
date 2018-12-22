import { returnFrArticle } from "../WordSelector_functions/ReturnArticles.functions";
import { returnEnArticle } from "../WordSelector_functions/ReturnArticles.functions";
import { associateFrWordWithArticle } from "../WordSelector_functions/AssociateWordWithArticle.function";
import { associateEnWordWithArticle } from "../WordSelector_functions/AssociateWordWithArticle.function";

// this function returns the selected word with the matching article if necessary
// it also returns the accepted translations for the selected word
// source language : single word inside an array
// destination language : one or several accepted translations in an array

// return examples where source language is FR:
// {fr: ["marcher"], en: ["to walk"]}
// {fr: ["voyage"], en: ["travel", "journey"]}
// return examples where source language is EN:
// {fr: ["le chat", "la chatte"], en: ["the cat"]}

exports.return_Selected_Words_With_Article = function(
  sourceLanguage,
  frWords,
  enWords,
  fr_form,
  en_form,
  articleForm
) {
  let frResults = [];
  let enResults = [];

  let frLimit = sourceLanguage === "fr" ? 1 : frWords.length;
  let enLimit = sourceLanguage === "en" ? 1 : enWords.length;

  //FR Loop, need to test the possibility of several fr_forms
  for (let a = 0; a < frLimit; a++) {
    for (let b = 0; b < fr_form.length; b++) {
      if (frWords[a][fr_form[b]]) {
        let fr_article = "";
        if (articleForm) {
          fr_article = returnFrArticle(
            fr_form[b],
            articleForm,
            frWords[a].isLApostrophe
          );
        }
        frResults.push(
          associateFrWordWithArticle(fr_article, frWords[a][fr_form[b]])
        );
      }
    }
  }

  //EN loop, there is always only one EN form
  for (let a = 0; a < enLimit; a++) {
    let en_article = "";
    if (articleForm) {
      en_article = returnEnArticle(
        en_form,
        articleForm,
        enWords[a].isArticleAn
      );
    }
    enResults.push(associateEnWordWithArticle(en_article, enWords[a][en_form]));
  }
  return { fr: frResults, en: enResults };
};