import randomPicker from "../../../services/randomPicker.function";
import returnSelectedWordsWithArticle from "./returnSelectedWords.function";
import returnForms from "./returnForms.function";
import pickFormRandomly from "./pickFormRandomly.function";
import pickWeakForm from "./pickWeakForm.function";
import shuffleArray from "../../../services/arrayShuffler.function";

/*
this is the main function, it formats words for the client, with informations gathered from the db
wordsToSelect contains either a single object "words", containing an array of the words to learn
or two objects : "words" and "formsStats", an array matching the words to learn, with 
the stats of the user for each form of the words to learn
see getLesson.controller.js server side for a clearer understanding
*/

function FrEnWordSelector(wordsToSelect, shuffle) {
  let wordCounter = 0;
  let preparedWords = []; // array of objects

  // main loop
  while (wordCounter < wordsToSelect.words.length) {
    let formDetails;
    const word = wordsToSelect.words[wordCounter];
    let weakForms = false; // contains the formsStats of the user for the current word
    if (wordsToSelect.formsStats) {
      weakForms = wordsToSelect.formsStats[wordCounter];
    }

    // picks randomly the source language and the form the first time it is presented (null or false)
    if (!weakForms) {
      formDetails = pickFormRandomly(word);
    } else {
      formDetails = pickWeakForm(weakForms);
    }

    const { sourceForm, sourceLanguage } = formDetails;
    const forms = returnForms(sourceForm, word.type, sourceLanguage);
    const frenchForm = forms.fr;
    const englishForm = forms.en;

    // only nouns accept articles, special cases when nouns have only certains articles -> hasUniqueForm = true
    let isDefinite = true;
    let hasArticle = false;
    if (word.type === "noun" && !word.hasUniqueForm) {
      isDefinite = randomPicker([true, false]);
      hasArticle = true;
    }

    const selectedWords = returnSelectedWordsWithArticle(
      sourceLanguage,
      word.fr,
      word.en,
      frenchForm,
      englishForm,
      hasArticle,
      isDefinite,
      word.enName
    );
    preparedWords.push({
      selectedForm: selectedWords.selectedForm,
      fr: selectedWords.fr,
      en: selectedWords.en,
      lesson: word.lesson,
      theme: word.theme,
    });
    wordCounter += 1;
  }
  if (shuffle) {
    preparedWords = shuffleArray(preparedWords);
  }
  return preparedWords;
}

export default FrEnWordSelector;
