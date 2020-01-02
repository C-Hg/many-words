import EnglishWord from "../../../common/models/englishWord.interface";
import EnglishForms from "../../../common/models/englishForms.interface";
import getRegex from "../getRegex";
import markdownRegex from "../constantRegex";

// this function fetches the data from all columns in the English table of the Markdown document
// if data is not null, returns an array of objects with properly formatted data
// however data still needs validation, done by checkEnFormat function

const getEnglishWordsFromMarkdown = (
  document: string
): Partial<EnglishWord>[] => {
  const { englishSingular, englishPlural, englishUniqueForm } = markdownRegex;
  const singularRegex = getRegex(englishSingular);
  const pluralRegex = getRegex(englishPlural);
  const uniqueFormRegex = getRegex(englishUniqueForm);
  const englishWords: Partial<EnglishWord>[] = [];

  const forms = [
    ["singular", singularRegex],
    ["plural", pluralRegex],
    ["uniqueForm", uniqueFormRegex],
  ];
  forms.forEach(([form, formRegex]: [keyof EnglishForms, RegExp]) => {
    const words = document.match(formRegex);
    if (words) {
      // the first match contains all the alternatives, remove it
      words.shift();
      words.forEach((alternative, index) => {
        if (englishWords[index] === undefined) {
          englishWords[index] = { acceptedForms: [] };
        }
        englishWords[index][form] = alternative;
        if (!englishWords[index].acceptedForms.includes(form)) {
          englishWords[index].acceptedForms.push(form);
        }
      });
    }
  });

  if (englishWords.length > 0) {
    return englishWords;
  }
  return null;
};

export default getEnglishWordsFromMarkdown;
