import { getFrForm } from "./getFrForm.function";
import { getEnForm } from "./getEnForm.function";
import {
  associateFrWordWithArticle,
  associateEnWordWithArticle,
} from "../exercise/word_selector/associateWordWithArticle.function";
import returnFrenchArticle from "../exercise/word_selector/returnFrenchArticle.function";
import returnEnglishArticle from "../exercise/word_selector/returnEnglishArticle.function";

function selectWordsToLearnForms(singOrPlur, mascOrFem, defOrIndef, words) {
  const formattedWords = words.map(word => {
    let enWord;
    let frWord;
    let enForm;
    let frForm;

    if (word.hasUniqueForm) {
      enWord = word.en[0].uniqueForm;
      frWord = word.fr[0].uniqueForm;
    } else {
      frForm = getFrForm(singOrPlur, mascOrFem, word.fr[0].acceptedForms);
      enForm = getEnForm(singOrPlur, word.en[0].acceptedForms);
      if (word.type === "noun") {
        const frArticle = returnFrenchArticle(
          frForm,
          defOrIndef,
          word.fr[0].isLApostrophe
        );
        frWord = associateFrWordWithArticle(frArticle, word.fr[0][frForm]);
        const enArticle = returnEnglishArticle(
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
    return { en: enWord, fr: frWord };
  });

  return formattedWords;
}

export default selectWordsToLearnForms;
