import { randomPicker } from "../../common/randomPicker.function";
import return_Selected_Words_With_Article from "./returnSelectedWords.function";
import { returnForms } from "./returnForms.function";
import pickFormRandomly from "./pickFormRandomly.function";

// this is the main function, it formats words for the client, with informations gathered from the db

function FrEnWordSelector(wordsToSelect) {
  let wordCounter = 0;
  let preparedWords = []; //array of objects

  //main loop
  while (wordCounter < wordsToSelect.length) {
    let word = wordsToSelect.words[wordCounter];
    let articleForm, fr_form, en_form;
    let formDetails;

    if (!wordsToSelect.proficiencyIndexes) {
      formDetails = pickFormRandomly(word);
    }

    let sourceForm = formDetails.sourceForm;
    let sourceLanguage = formDetails.sourceLanguage;

    let fr_en_forms = returnForms(sourceForm, word.type);
    fr_form = fr_en_forms.fr;
    en_form = fr_en_forms.en;

    //only nouns accept articles
    if (word.type === "noun") {
      articleForm = randomPicker(["definite", "indefinite"]);
    }

    let selectedWords = return_Selected_Words_With_Article(
      sourceLanguage,
      word.fr,
      word.en,
      fr_form,
      en_form,
      articleForm,
      word.en_name
    );
    preparedWords.push({
      selectedForm: selectedWords.selectedForm,
      fr: selectedWords.fr,
      en: selectedWords.en
    });
    wordCounter++;
  }
  return preparedWords;
}

export default FrEnWordSelector;
