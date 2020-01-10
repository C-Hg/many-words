import markdownRegex from "../markdownRegex";
import FrenchForms from "./frenchForms.interface";
import FrenchWord from "./frenchWord.interface";

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
  const { frenchFormsRegex } = markdownRegex;
  const frenchWords: FrenchWord[] = [];

  frenchForms.forEach(form => {
    const words = document.match(frenchFormsRegex[form]);
    if (words) {
      // the first match contains all the alternatives together, remove it
      words.shift();
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
