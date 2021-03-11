import { FORMS } from "../../../stats/constants";
import { FrenchNameForms, ARTICLE_FORMS } from "../../types/name.interface";

const FRENCH_ARTICLES = {
  definite: {
    pluralFeminine: "les",
    pluralMasculine: "les",
    singularFeminine: "la",
    singularMasculine: "le",
  },
  indefinite: {
    pluralFeminine: "des",
    pluralMasculine: "des",
    singularFeminine: "une",
    singularMasculine: "un",
  },
};

const addFrenchArticle = (
  word: string,
  articleForm: ARTICLE_FORMS,
  form: FrenchNameForms
): string => {
  if (
    articleForm === ARTICLE_FORMS.Definite &&
    (form === FORMS.SingularFeminine || form === FORMS.SingularMasculine)
  ) {
    const needsLApostrophe = /^[aâeéèêhiîoôu]/i;
    if (needsLApostrophe.test(word)) {
      return `l'${word}`;
    }
  }

  const article = FRENCH_ARTICLES[articleForm][form];
  return `${article} ${word}`;
};

export default addFrenchArticle;
