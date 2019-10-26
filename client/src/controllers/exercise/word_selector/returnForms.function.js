const returnForms = (sourceForm, type, sourceLanguage) => {
  let englishForm = "";
  let frenchForm = "";

  /* ------------------     EN is the source language      ------------------    */
  if (sourceLanguage === "en") {
    if (type === "adjective") {
      englishForm = "uniqueForm";
      frenchForm = ["masc_sing", "masc_plur", "fem_sing", "fem_plur"];
    } else {
      switch (sourceForm) {
        case "sing":
          englishForm = sourceForm;
          frenchForm = ["masc_sing", "fem_sing"];
          break;

        case "plur":
          englishForm = sourceForm;
          frenchForm = ["masc_plur", "fem_plur"];
          break;

        default:
          frenchForm = ["uniqueForm"];
          englishForm = "uniqueForm";
          break;
      }
    }
    /* ------------------     FR is the source language      ------------------    */
  } else if (type === "adjective") {
    frenchForm = [sourceForm];
    englishForm = "uniqueForm";
  } else {
    switch (sourceForm) {
      case "masc_sing":
      case "fem_sing":
        englishForm = "sing";
        frenchForm = [sourceForm];
        break;

      case "masc_plur":
      case "fem_plur":
        englishForm = "plur";
        frenchForm = [sourceForm];
        break;

      default:
        frenchForm = ["uniqueForm"];
        englishForm = "uniqueForm";
        break;
    }
  }
  return { fr: frenchForm, en: englishForm };
};

export default returnForms;

/*
one major role of this function is to return ONLY ONE form for the source language,
and all possible forms for the destination language
whether all possible forms do exist or not is checked in returnSelectedWordsWithArticles

adjectives are an exception : uniqueForm in EN but not in FR, thus the adjective type check

frenchForm can be a single element or two elements depending on the source language
for the sake of simplicity, it is always an array;
englishForm is alway a single element, returned as a string;

*/
