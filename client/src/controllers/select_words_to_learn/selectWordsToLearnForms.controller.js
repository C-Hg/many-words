import { getFrForm } from "./getFrForm.function";
import { getEnForm } from "./getEnForm.function";
import {
  returnFrArticle,
  returnEnArticle
} from "../exercise_fetcher/word_selector/returnArticles.functions";
import {
  associateFrWordWithArticle,
  associateEnWordWithArticle
} from "../exercise_fetcher/word_selector/associateWordWithArticle.function";

function selectWordsToLearnForms(singOrPlur, mascOrFem, defOrIndef, words) {
  let formattedWords = [];

  for (let word of words) {
    let enWord, frWord, enForm, frForm;
    if (word.hasUniqueForm) {
      enWord = word.en[0].uniqueForm;
      frWord = word.fr[0].uniqueForm;
    } else {
      frForm = getFrForm(singOrPlur, mascOrFem, word.fr[0].acceptedForms);
      enForm = getEnForm(singOrPlur, word.en[0].acceptedForms);
      if (word.type === "noun") {
        let frArticle = returnFrArticle(
          frForm,
          defOrIndef,
          word.fr[0].isLApostrophe
        );
        frWord = associateFrWordWithArticle(frArticle, word.fr[0][frForm]);
        let enArticle = returnEnArticle(
          enForm,
          defOrIndef,
          word.en[0].isArticleAn
        );
        enWord = associateEnWordWithArticle(enArticle, word.en[0][enForm]);
      } else {
        enWord = word.en[0][enForm];
        frWord = word.fr[0][frForm];
      }
    }
    formattedWords.push({ en: enWord, fr: frWord });
  }
  return formattedWords;
}

export default selectWordsToLearnForms;
