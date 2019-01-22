import randomPicker from "../../common/randomPicker.function";

export default function pickFormRandomly(word) {
  let sourceLanguage = randomPicker(["fr", "en"]);
  let sourceForm = randomPicker(word[sourceLanguage][0].acceptedForms);

  return {
    sourceLanguage: sourceLanguage,
    sourceForm: sourceForm
  };
}
