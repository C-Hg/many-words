import getAcceptedAnswersForms from "./getAcceptedAnswersForms.function";

import { Word, Forms, FormValue, Languages } from "../../../graphql/types";
import { LANGUAGES } from "../../../stats/constants";

const getAcceptedAnswers = (
  word: Word,
  sourceForm: Forms,
  sourceLanguage: Languages
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
    const acceptedAnswersForThisForm = word[targetLanguage].words.find(
      (formValues) => formValues.form === form
    ) as FormValue;
    if (acceptedAnswersForThisForm) {
      return acceptedForms.push(...acceptedAnswersForThisForm.values);
    }
  });

  return acceptedForms;
};

export default getAcceptedAnswers;
