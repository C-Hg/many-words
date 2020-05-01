import sample from "lodash.sample";

import { Word, Languages, Forms } from "../../../graphql/types";

const LANGUAGES = ["english", "french"];

const selectForm = (word: Word) => {
  const { weakestForms } = word;
  let selectForm: Forms;
  let selectedLanguage: Languages;

  if (!weakestForms) {
    selectedLanguage = sample(LANGUAGES) as Languages;
    selectForm = sample(Object.keys(word[selectedLanguage].words[0])) as Forms;
  }
};

export default selectForm;
