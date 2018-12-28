import { randomPicker } from "../../Common/randomPicker.function";
import { return_Selected_Words_With_Article } from "./returnSelectedWords.function";
import { returnForms } from "./returnForms.function";

const formattedWord = function(sourceLanguage, fr, en) {
  this.sourceLanguage = sourceLanguage;
  this.fr = fr;
  this.en = en;
};

// this is the main function, it formats words for the client, with informations gathered from the db

exports.fr_en_wordSelector = function(wordsToSelect) {
  let wordCounter = 0;
  let preparedWords = []; //array of objects

  //main loop
  while (wordCounter < wordsToSelect.length) {
    let word = wordsToSelect[wordCounter];
    let sourceLanguage = randomPicker(["fr", "en"]);
    let articleForm = "";
    let fr_form = "";
    let en_form = "";

    //return the accepted forms for FR and EN words depending on the source words
    if (word.hasUniqueForm) {
      fr_form = ["uniqueForm"];
      en_form = "uniqueForm";
    } else {
      let sourceForm = randomPicker(word[sourceLanguage][0].acceptedForms);
      let forms = returnForms(sourceForm, word.type);
      fr_form = forms.fr;
      en_form = forms.en;
    }

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
      articleForm
    );
    preparedWords.push(
      new formattedWord(sourceLanguage, selectedWords.fr, selectedWords.en)
    );
    wordCounter++;
  }
  return preparedWords;
};
