import sample from "lodash.sample";

import {
  Word,
  FormStats,
  FormValue,
  Forms,
  Languages,
} from "../../../graphql/types";
import { SelectionResult } from "../../interfaces/word.interface";

const languages = ["english", "french"];

const selectForm = (word: Word): SelectionResult => {
  const { weakestForms } = word;
  let form: Forms;
  let language: Languages;
  let wordToTranslate: string;

  // when the word has never been studied, pick form and language randomly
  if (weakestForms.length === 0) {
    language = sample(languages) as Languages;
    const formValue = sample(word[language].words) as FormValue;
    form = formValue.form;
    wordToTranslate = formValue.values[0];
  } else {
    // otherwise, choose randomly among the weakest forms already
    const chosenForm = sample(weakestForms) as FormStats;
    language = chosenForm.language;
    form = chosenForm.form;
    const formValue = word[language].words.find(
      (formValue) => formValue.form === form
    ) as FormValue;
    wordToTranslate = formValue.values[0];
  }

  return {
    form,
    language,
    wordToTranslate,
  };
};

export default selectForm;
