import getAcceptedAnswersForms from "./getAcceptedAnswersForms.function";
import getWordsWithArticle from "./getWordsWithArticle.function";

import { Word, Forms, FormValue, Languages } from "../../../graphql/types";
import { LANGUAGES } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../interfaces/name.interface";

const getAcceptedAnswers = (
  word: Word,
  sourceForm: Forms,
  sourceLanguage: Languages,
  articleForm?: ARTICLE_FORMS
): string[] => {
  const { type } = word;

  // infer target language from source language
  const targetLanguage: Languages =
    sourceLanguage === LANGUAGES.French ? LANGUAGES.English : LANGUAGES.French;

  const acceptedAnswersForms = getAcceptedAnswersForms(
    sourceForm,
    type,
    sourceLanguage
  );

  const acceptedForms: string[] = [];
  acceptedAnswersForms.forEach((form) => {
    const acceptedAnswers = word[targetLanguage].words.find(
      (formValues) => formValues.form === form
    ) as FormValue;
    if (acceptedAnswers) {
      if (articleForm === undefined) {
        acceptedForms.push(...acceptedAnswers.values);
      } else {
        // articleForm is defined, add an article to the names
        const acceptedAnswersWithArticles = getWordsWithArticle(
          acceptedAnswers.values,
          articleForm,
          form,
          targetLanguage
        );
        acceptedForms.push(...acceptedAnswersWithArticles);
      }
    }
  });

  return acceptedForms;
};

export default getAcceptedAnswers;
