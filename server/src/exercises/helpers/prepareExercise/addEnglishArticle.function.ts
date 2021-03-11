import { FORMS } from "../../../stats/constants";
import { EnglishNameForms, ARTICLE_FORMS } from "../../types/name.interface";

const ENGLISH_ARTICLES = {
  definite: {
    singular: "the",
    plural: "the",
  },
  indefinite: {
    singular: "a",
    plural: "",
  },
};

const addEnglishArticle = (
  word: string,
  articleForm: ARTICLE_FORMS,
  form: EnglishNameForms
): string => {
  if (articleForm === ARTICLE_FORMS.Indefinite && form === FORMS.Singular) {
    const beginningWithVowel = /^[aeiou]/;
    if (beginningWithVowel.test(word)) {
      return `an ${word}`;
    }
  }

  const article = ENGLISH_ARTICLES[articleForm][form];

  return `${article} ${word}`.trim();
};

export default addEnglishArticle;
