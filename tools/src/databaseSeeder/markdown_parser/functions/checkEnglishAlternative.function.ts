import EnglishWord from "../../../common/models/englishWord.interface";
import EnglishForms from "../../../common/models/englishForms.interface";
import regex from "../markdownRegex";

// this function fetches the data from a given column in the EN table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkEnFormat function

const checkEnglishAlternative = (altName, document) => {
  const singularRegex = regex[`enSing${altName}`];
  const pluralRegex = regex[`enPlur${altName}`];
  const uniqueFormRegex = regex[`enUnique${altName}`];
  const acceptedForms: (keyof EnglishForms)[] = [];
  const result: Partial<EnglishWord> = {};

  // TODO: better data structure and typing: object? fix markdown regex first -> function
  const forms = [
    ["singular", singularRegex],
    ["plural", pluralRegex],
    ["uniqueForm", uniqueFormRegex],
  ];
  forms.forEach(([form, formRegex]: [keyof EnglishForms, RegExp]) => {
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
