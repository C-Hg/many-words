exports.returnForms = function(sourceForm) {
  let en_form = "";
  let fr_form = "";
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

    case "sing":
      en_form = sourceForm;
      fr_form = ["masc_sing", "fem_sing"];
      break;

    case "plur":
      en_form = sourceForm;
      fr_form = ["masc_plur", "fem_plur"];
      break;

    default:
      break;
  }
  return { fr: fr_form, en: en_form };
};

//fr_form can be a single element or two elements depending on the source language
//for the sake of simplicity, it is always an array;
//en_form is alway a single element, returned as a string;
