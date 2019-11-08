import getFrenchForm from "./getFrenchForm.function";
import getEnglishForm from "./getEnglishForm.function";
import {
  associatefrenchWordWithArticle,
  associateenglishWordWithArticle,
} from "../exercise/word_selector/associateWordWithArticle.function";
import getFrenchArticle from "../exercise/word_selector/getFrenchArticle.function";
import getEnglishArticle from "../exercise/word_selector/getEnglishArticle.function";

function selectWordsToLearnForms(number, gender, isDefinite, words) {
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
        const frArticle = getFrenchArticle(
          frenchForm,
          isDefinite,
          word.fr[0].isLApostrophe
        );
        frenchWord = associatefrenchWordWithArticle(
          frArticle,
          word.fr[0][frenchForm]
        );
        const enArticle = getEnglishArticle(
          englishForm,
          isDefinite,
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
