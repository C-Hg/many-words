const regex = require("../markdownRegex");

// this function fetches the data from a given column in the FR table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkFrFormat function

const checkFrenchAlternative = (altName, document) => {
  const mascSingRegex = regex[`frMascSing${altName}`];
  const mascPlurRegex = regex[`frMascPlur${altName}`];
  const femSingRegex = regex[`frFemSing${altName}`];
  const femPlurRegex = regex[`frFemPlur${altName}`];
  const uniqueFormRegex = regex[`frUnique${altName}`];
  const isLApostropheRegex = regex[`LApostrophe${altName}`];
  const acceptedForms = [];
  const result = {};

  const forms = [
    ["masc_sing", mascSingRegex],
    ["masc_plur", mascPlurRegex],
    ["fem_sing", femSingRegex],
    ["fem_plur", femPlurRegex],
    ["uniqueForm", uniqueFormRegex],
  ];
  for (const [form, formRegex] of forms) {
    const match = document.match(formRegex);
    if (match) {
      acceptedForms.push(form);
      result[form] = match[0];
    }
  }

  if (Object.keys(result).length) {
    const lApostropheMatch = document.match(isLApostropheRegex);
    if (lApostropheMatch) {
      result.isLApostrophe = true;
    }
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};

export default checkFrenchAlternative;
