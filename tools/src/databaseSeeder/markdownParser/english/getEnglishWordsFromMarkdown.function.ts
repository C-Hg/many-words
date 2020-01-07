import EnglishWord from "./englishWord.interface";
import EnglishForms from "./englishForms.interface";
import markdownRegex from "../markdownRegex";

const englishForms: (keyof EnglishForms)[] = [
  "singular",
  "plural",
  "uniqueForm",
];

/**
 * Fetches the data from all columns in the English table of the Markdown document
 * Data still needs validation, done by checkEnglishFormat function
 */
const getEnglishWordsFromMarkdown = (
  document: string
): Partial<EnglishWord>[] => {
  const { englishFormsRegex } = markdownRegex;
  const englishWords: Partial<EnglishWord>[] = [];

  englishForms.forEach(form => {
    const words = document.match(englishFormsRegex[form]);
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
