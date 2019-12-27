const regex = require("../markdownRegex");

// this function fetches the data from a given column in the EN table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkEnFormat function

const checkEnglishAlternative = (altName, document) => {
  const singularRegex = regex[`enSing${altName}`];
  const pluralRegex = regex[`enPlur${altName}`];
  const uniqueFormRegex = regex[`enUnique${altName}`];
  const acceptedForms = [];
  const result = {};

  const forms = [
    ["singular", singularRegex],
    ["plural", pluralRegex],
    ["uniqueForm", uniqueFormRegex],
  ];
  forms.forEach(([form, formRegex]) => {
    const match = document.match(formRegex);
    if (match) {
      acceptedForms.push(form);
      // eslint-disable-next-line prefer-destructuring
      result[form] = match[0];
    }
  });

  if (Object.keys(result).length) {
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};

export default checkEnglishAlternative;
