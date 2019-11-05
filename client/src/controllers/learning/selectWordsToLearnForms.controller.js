import getFrenchForm from "./getFrenchForm.function";
import getEnglishForm from "./getEnglishForm.function";
import {
  associatefrenchWordWithArticle,
  associateenglishWordWithArticle,
} from "../exercise/word_selector/associateWordWithArticle.function";
import returnFrenchArticle from "../exercise/word_selector/returnFrenchArticle.function";
import returnEnglishArticle from "../exercise/word_selector/returnEnglishArticle.function";

function selectWordsToLearnForms(number, gender, defOrIndef, words) {
  const formattedWords = words.map(word => {
    let englishWord;
    let frenchWord;
    let englishForm;
    let frenchForm;

    if (word.hasUniqueForm) {
      englishWord = word.en[0].uniqueForm;
      frenchWord = word.fr[0].uniqueForm;
    } else {
      frenchForm = getFrenchForm(number, gender, word.fr[0].acceptedForms);
      englishForm = getEnglishForm(number, word.en[0].acceptedForms);
      if (word.type === "noun") {
        const frArticle = returnFrenchArticle(
          frenchForm,
          defOrIndef,
          word.fr[0].isLApostrophe
        );
        frenchWord = associatefrenchWordWithArticle(
          frArticle,
          word.fr[0][frenchForm]
        );
        const enArticle = returnEnglishArticle(
          englishForm,
          defOrIndef,
          word.en[0].isArticleAn
        );
        englishWord = associateenglishWordWithArticle(
          enArticle,
          word.en[0][englishForm]
        );
      } else {
        englishWord = word.en[0][englishForm];
        frenchWord = word.fr[0][frenchForm];
      }
    }
    return { en: englishWord, fr: frenchWord };
  });

  return formattedWords;
}

export default selectWordsToLearnForms;
