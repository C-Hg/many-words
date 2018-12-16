exports.returnUniqueForm = function(sourceLanguage, frWords, enWords) {
  let frResults = [];
  let enResults = [];
  if (sourceLanguage === "fr") {
    frResults = frWords[0].uniqueForm;
    for (let a = 0; a < enWords.length; a++) {
      enResults.push(enWords[a].uniqueForm);
    }
  } else {
    enResults = enWords[0].uniqueForm;
    for (let a = 0; a < frWords.length; a++) {
      frResults.push(frWords[a].uniqueForm);
    }
  }
  return { fr: frResults, en: enResults };
};

// source language : single word as a string
// destination language : one or several alternatives in an array
// return example:
// {fr: "marcher", en: ["to walk"]}
// {fr: "voyage", en: ["travel", "journey"]}
