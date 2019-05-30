import { returnFrArticle, returnEnArticle } from "./returnArticles.functions";
import {
  associateFrWordWithArticle,
  associateEnWordWithArticle
} from "./associateWordWithArticle.function";

// this function returns the selected word with the matching article if necessary
// it also returns the accepted translations for the selected word
// source language : single word inside an array
// destination language : one or several accepted translations in an array

// update for progress tracking: also returns an array with source language and selected form

// return examples where source language is FR:
// {fr: ["marcher"], en: ["to walk"]}
// {fr: ["voyage"], en: ["travel", "journey"]}
// return examples where source language is EN:
// {fr: ["le chat", "la chatte"], en: ["the cat"]}

function returnSelectedWordsWithArticle(
  sourceLanguage,
  frWords,
  enWords,
  frForm,
  enForm,
  articleForm,
  enName
) {
  const frResults = [];
  const enResults = [];

  const frLimit = sourceLanguage === "fr" ? 1 : frWords.length;
  const enLimit = sourceLanguage === "en" ? 1 : enWords.length;

  // FR Loop, need to test the possibility of several frForms
  for (let a = 0; a < frLimit; a++) {
    for (let b = 0; b < frForm.length; b++) {
      if (frWords[a][frForm[b]]) {
        let frArticle = "";
        if (articleForm) {
          frArticle = returnFrArticle(
            frForm[b],
            articleForm,
            frWords[a].isLApostrophe
          );
        }
        frResults.push(
          associateFrWordWithArticle(frArticle, frWords[a][frForm[b]])
        );
      }
    }
  }

  // EN loop, there is always only one EN form
  for (let a = 0; a < enLimit; a++) {
    let enArticle = "";
    if (articleForm) {
      enArticle = returnEnArticle(enForm, articleForm, enWords[a].isArticleAn);
    }
    enResults.push(associateEnWordWithArticle(enArticle, enWords[a][enForm]));
  }

  // gathering info for progress tracking
  const selectedWord = sourceLanguage === "fr" ? frForm[0] : enForm;
  const selectedForm = [enName, sourceLanguage, selectedWord];

  return { fr: frResults, en: enResults, selectedForm };
}

export default returnSelectedWordsWithArticle;
