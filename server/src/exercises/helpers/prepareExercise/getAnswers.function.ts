import getAnswersForms from "./getAnswersForms.function";
import getWordsWithArticle from "./getWordsWithArticle.function";

import { Word, Forms, FormValue, Languages } from "../../../graphql/exercises.types";
import { LANGUAGES } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../interfaces/name.interface";

const getAnswers = (
  word: Word,
  sourceForm: Forms,
  sourceLanguage: Languages,
  articleForm?: ARTICLE_FORMS
): string[] => {
  const { type } = word;

  // infer target language from source language
  const targetLanguage: Languages =
    sourceLanguage === LANGUAGES.French ? LANGUAGES.English : LANGUAGES.French;

  const answersForms = getAnswersForms(sourceForm, type, sourceLanguage);

  const acceptedForms: string[] = [];

  answersForms.forEach((form) => {
    const answers = word[targetLanguage].words.find(
      (formValues) => formValues.form === form
    ) as FormValue;
    if (answers) {
      if (articleForm === undefined) {
        acceptedForms.push(...answers.values);
      } else {
        // articleForm is defined, add an article to the names
        const answersWithArticles = getWordsWithArticle(
          answers.values,
          articleForm,
          form,
          targetLanguage
        );
        acceptedForms.push(...answersWithArticles);
      }
    }
  });

  return acceptedForms;
};

export default getAnswers;
