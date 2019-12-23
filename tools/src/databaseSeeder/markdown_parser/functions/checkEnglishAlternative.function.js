const regex = require("../markdownRegex");

// this function fetches the data from a given column in the EN table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkEnFormat function

const checkEnglishAlternative = (altName, document) => {
  const singRegex = regex[`enSing${altName}`];
  const plurRegex = regex[`enPlur${altName}`];
  const uniqueFormRegex = regex[`enUnique${altName}`];
  const isAnRegex = regex[`isAn${altName}`];
  const acceptedForms = [];
  const result = {};

  const forms = [
    ["sing", singRegex],
    ["plur", plurRegex],
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
    const anMatch = document.match(isAnRegex);
    if (anMatch) {
      result.isArticleAn = true;
    }
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};

export default checkEnglishAlternative;
