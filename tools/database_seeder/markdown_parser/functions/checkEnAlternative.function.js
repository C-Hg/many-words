const regex = require("../markdownRegex");

// this function fetches the data from a given column in the EN table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkEnFormat function

exports.checkEnAlternative = function(altName, document) {
  let singRegex = regex["enSing" + altName];
  let plurRegex = regex["enPlur" + altName];
  let uniqueFormRegex = regex["enUnique" + altName];
  let isAnRegex = regex["isAn" + altName];
  let acceptedForms = [];
  let result = {};

  let forms = [
    ["sing", singRegex],
    ["plur", plurRegex],
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
    let anMatch = document.match(isAnRegex);
    if (anMatch) {
      result.isArticleAn = true;
    }
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};
