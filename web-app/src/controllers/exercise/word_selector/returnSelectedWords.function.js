/* eslint-disable no-plusplus */
import associateFrenchWordWithArticle from "./associateFrenchWordWithArticle.function";
import getFrenchArticle from "./getFrenchArticle.function";
import getEnglishArticle from "./getEnglishArticle.function";
import associateEnglishWordWithArticle from "./associateEnglishWorkWithArticle.function";

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
  frenchWords,
  englishWords,
  frenchForm,
  englishForm,
  hasArticle,
  isDefinite,
  englishName
) {
  const frResults = [];
  const enResults = [];

  const numberOfFrenchWords = sourceLanguage === "fr" ? 1 : frenchWords.length;
  const numberOfEnglishWords =
    sourceLanguage === "en" ? 1 : englishWords.length;

  // FR Loop, need to test the possibility of several frForms
  for (let a = 0; a < numberOfFrenchWords; a++) {
    for (let b = 0; b < frenchForm.length; b++) {
      if (frenchWords[a][frenchForm[b]]) {
        let article = "";
        if (hasArticle) {
          article = getFrenchArticle(
            frenchForm[b],
            isDefinite,
            frenchWords[a].isLApostrophe
          );
        }
        frResults.push(
          associateFrenchWordWithArticle(article, frenchWords[a][frenchForm[b]])
        );
      }
    }
  }

  // EN loop, there is always only one EN form
  for (let a = 0; a < numberOfEnglishWords; a++) {
    let enArticle = "";
    if (hasArticle) {
      enArticle = getEnglishArticle(
        englishForm,
        isDefinite,
        englishWords[a].isArticleAn
      );
    }
    enResults.push(
      associateEnglishWordWithArticle(enArticle, englishWords[a][englishForm])
    );
  }

  // gathering info for progress tracking
  const selectedWord = sourceLanguage === "fr" ? frenchForm[0] : englishForm;
  const selectedForm = [englishName, sourceLanguage, selectedWord];

  return { fr: frResults, en: enResults, selectedForm };
}

export default returnSelectedWordsWithArticle;
