import { randomPicker } from "../../common/randomPicker.function";
import return_Selected_Words_With_Article from "./returnSelectedWords.function";
import { returnForms } from "./returnForms.function";
import pickFormRandomly from "./pickFormRandomly.function";
import pickWeakForm from "./pickWeakForm.function";
import { shuffleArray } from "../../common/arrayShuffler.function";

/*
this is the main function, it formats words for the client, with informations gathered from the db
wordsToSelect contains either a single object "words", containing an array of the words to learn
or two objects : "words" and "stats_by_form", an array matching the words to learn, with 
the stats of the user for each form of the words to learn
see getLesson.controller.js server side for a clearer understanding 
*/

function FrEnWordSelector(wordsToSelect) {
  let wordCounter = 0;
  let preparedWords = []; //array of objects

  //main loop
  while (wordCounter < wordsToSelect.words.length) {
    let articleForm, fr_form, en_form;
    let formDetails;
    let word = wordsToSelect.words[wordCounter];
    let weakForms = false; //contains the stats_by_form of the user for the current word
    if (wordsToSelect.stats_by_form) {
      weakForms = wordsToSelect.stats_by_form[wordCounter];
    }

    // picks randomly the source language and the form the first time it is presented (null or false)
    if (!weakForms) {
      formDetails = pickFormRandomly(word);
    } else {
      formDetails = pickWeakForm(weakForms);
    }

    let sourceForm = formDetails.sourceForm;
    let sourceLanguage = formDetails.sourceLanguage;

    let forms = returnForms(sourceForm, word.type, sourceLanguage);
    fr_form = forms.fr;
    en_form = forms.en;

    //only nouns accept articles, special cases when nouns have only certains articles -> hasUniqueForm = true
    if (word.type === "noun" && !word.hasUniqueForm) {
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
  preparedWords = shuffleArray(preparedWords);
  return preparedWords;
}

export default FrEnWordSelector;
