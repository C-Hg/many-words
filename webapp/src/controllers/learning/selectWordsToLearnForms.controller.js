import getFrenchForm from "./getFrenchForm.function";
import getEnglishForm from "./getEnglishForm.function";
import associateFrenchWordWithArticle from "../exercise/word_selector/associateFrenchWordWithArticle.function";
import getFrenchArticle from "../exercise/word_selector/getFrenchArticle.function";
import getEnglishArticle from "../exercise/word_selector/getEnglishArticle.function";
import associateEnglishWordWithArticle from "../exercise/word_selector/associateEnglishWorkWithArticle.function";

function selectWordsToLearnForms(switchesStates, words) {
  const { number, gender, isDefinite } = switchesStates;
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
        const frenchArticle = getFrenchArticle(
          frenchForm,
          isDefinite,
          word.fr[0].isLApostrophe
        );
        frenchWord = associateFrenchWordWithArticle(
          frenchArticle,
          word.fr[0][frenchForm]
        );
        const enArticle = getEnglishArticle(
          englishForm,
          isDefinite,
          word.en[0].isArticleAn
        );
        englishWord = associateEnglishWordWithArticle(
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
