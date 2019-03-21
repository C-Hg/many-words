exports.returnForms = function(sourceForm, type, sourceLanguage) {
  let en_form = "";
  let fr_form = "";

  /* ------------------     EN is the source language      ------------------    */
  if (sourceLanguage === "en") {
    if (type === "adjective") {
      en_form = "uniqueForm";
      fr_form = ["masc_sing", "masc_plur", "fem_sing", "fem_plur"];
    } else {
      switch (sourceForm) {
        case "sing":
          en_form = sourceForm;
          fr_form = ["masc_sing", "fem_sing"];
          break;

        case "plur":
          en_form = sourceForm;
          fr_form = ["masc_plur", "fem_plur"];
          break;

        default:
          fr_form = ["uniqueForm"];
          en_form = "uniqueForm";
          break;
      }
    }
  } else {
    /* ------------------     FR is the source language      ------------------    */
    if (type === "adjective") {
      fr_form = [sourceForm];
      en_form = "uniqueForm";
    } else {
      switch (sourceForm) {
        case "masc_sing":
        case "fem_sing":
          en_form = "sing";
          fr_form = [sourceForm];
          break;

        case "masc_plur":
        case "fem_plur":
          en_form = "plur";
          fr_form = [sourceForm];
          break;

        default:
          fr_form = ["uniqueForm"];
          en_form = "uniqueForm";
          break;
      }
    }
  }
  return { fr: fr_form, en: en_form };
};

/* 
one major role of this function is to return ONLY ONE form for the source language,
and all possible forms for the destination language
whether all possible forms do exist or not is checked in returnSelectedWordsWithArticles
 
adjectives are an exception : uniqueForm in EN but not in FR, thus the adjective type check

fr_form can be a single element or two elements depending on the source language
for the sake of simplicity, it is always an array;
en_form is alway a single element, returned as a string;

*/
