import addEnglishArticle from "./addEnglishArticle.function";
import addFrenchArticle from "./addFrenchArticle.function";

import { Forms, Languages } from "../../../graphql/types";
import { LANGUAGES } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../interfaces/name.interface";
import {
  isEnglishNameForms,
  isFrenchNameForms,
} from "../../interfaces/typeguards";

// TODO: add exceptions for words like universe or hibou that do not take "an" or "l'"
// for now, use unique forms
/**
 * Add an article to each word
 */
const getWordsWithArticle = (
  words: string[],
  articleForm: ARTICLE_FORMS,
  form: Forms,
  language: Languages
): string[] => {
  return words.map((word) => {
    if (language === LANGUAGES.English) {
      if (!isEnglishNameForms(form)) {
        throw new Error(
          `[getWordsWithArticle] unexpected english form ${form} for word: ${word}`
        );
      }
      return addEnglishArticle(word, articleForm, form);
    }
    if (!isFrenchNameForms(form)) {
      throw new Error(
        `[getWordsWithArticle] unexpected french form ${form} for word: ${word}`
      );
    }
    return addFrenchArticle(word, articleForm, form);
  });
};

export default getWordsWithArticle;
