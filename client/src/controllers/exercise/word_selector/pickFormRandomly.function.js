import { randomPicker } from "../../../services/randomPicker.function";

export default function pickFormRandomly(word) {
  const sourceLanguage = randomPicker(["fr", "en"]);
  let sourceForm;

  if (word.hasUniqueForm) {
    sourceForm = "uniqueForm";
  } else {
    sourceForm = randomPicker(word[sourceLanguage][0].acceptedForms);
  }

  return {
    sourceLanguage,
    sourceForm,
  };
}
