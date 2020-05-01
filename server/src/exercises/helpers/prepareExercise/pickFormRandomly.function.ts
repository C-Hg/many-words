

const pickFormRandomly = (word) => {
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

export default