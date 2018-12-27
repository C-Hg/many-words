const regex = require("../mdRegex");

// this function fetches the data from a given column in the FR table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkFrFormat function

exports.checkFrAlternative = function(altName, document) {
  let mascSingRegex = regex["frMascSing" + altName];
  let mascPlurRegex = regex["frMascPlur" + altName];
  let femSingRegex = regex["frFemSing" + altName];
  let femPlurRegex = regex["frFemPlur" + altName];
  let uniqueFormRegex = regex["frUnique" + altName];
  let isLApostropheRegex = regex["LApostrophe" + altName];
  let acceptedForms = [];
  let result = {};

  let forms = [
    ["masc_sing", mascSingRegex],
    ["masc_plur", mascPlurRegex],
    ["fem_sing", femSingRegex],
    ["fem_plur", femPlurRegex],
    ["uniqueForm", uniqueFormRegex]
  ];
  for (let [form, formRegex] of forms) {
    let match = document.match(formRegex);
    if (match) {
      acceptedForms.push(form);
      result[form] = match[0];
    }
  }

  if (Object.keys(result).length) {
    let lApostropheMatch = document.match(isLApostropheRegex);
    if (lApostropheMatch) {
      result.isLApostrophe = true;
    }
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};
