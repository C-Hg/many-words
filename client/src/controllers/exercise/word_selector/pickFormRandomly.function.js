import { randomPicker } from "../../common/randomPicker.function";

export default function pickFormRandomly(word) {
  let sourceLanguage = randomPicker(["fr", "en"]);
  let sourceForm;

  if (word.hasUniqueForm) {
    sourceForm = "uniqueForm";
  } else {
    sourceForm = randomPicker(word[sourceLanguage][0].acceptedForms);
  }

  return {
    sourceLanguage: sourceLanguage,
    sourceForm: sourceForm
  };
}
