import { randomPicker } from "../../../services/randomPicker.function";

// extract the source language and the form of the weakest word, or chooses one if several equally weak words
export default function pickWeakForm(weakForms) {
  let chosenForm;
  if (weakForms.length > 1) {
    chosenForm = randomPicker(weakForms);
  } else {
    [chosenForm] = weakForms;
  }

  return {
    sourceLanguage: chosenForm.language,
    sourceForm: chosenForm.form,
  };
}

/*
weakForms format :
[{
    language: "en",
    form: "sing",
    stats: -0.5
}]

*/
