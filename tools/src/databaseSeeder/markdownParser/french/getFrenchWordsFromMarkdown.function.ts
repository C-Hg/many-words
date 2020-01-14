import markdownRegex from "../markdownRegex";
import FrenchForms from "./frenchForms.interface";
import FrenchWord from "./frenchWord.interface";
import getWordsFromMarkdownByLine from "../getWordsFromMarkdownByLine.function";

const frenchForms: (keyof FrenchForms)[] = [
  "singularMasculine",
  "singularFeminine",
  "pluralMasculine",
  "pluralFeminine",
  "uniqueForm",
];

/**
 * Fetches the data from all columns in the French table of the Markdown document
 * Data still needs validation, done by checkFrenchFormat function
 */
const getFrenchWordsFromMarkdown = (document: string): FrenchWord[] => {
  const { formsRegex } = markdownRegex;
  const frenchWords: FrenchWord[] = [];

  frenchForms.forEach(form => {
    const words = getWordsFromMarkdownByLine(document, formsRegex.french[form]);
    if (words) {
      // one accepted word per column
      words.forEach((word, index) => {
        if (word !== undefined) {
          if (frenchWords[index] === undefined) {
            frenchWords[index] = { acceptedForms: [] };
          }
          frenchWords[index][form] = word;
          if (!frenchWords[index].acceptedForms.includes(form)) {
            frenchWords[index].acceptedForms.push(form);
          }
        }
      });
    }
  });

  if (frenchWords.length > 0) {
    return frenchWords;
  }
  return null;
};

export default getFrenchWordsFromMarkdown;
