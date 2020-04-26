import markdownRegex from "../markdownRegex";

import getWordsFromMarkdownByLine from "../getWordsFromMarkdownByLine.function";
import { FrenchWord, FrenchForms } from "./frenchWord.interface";

const frenchForms: FrenchForms[] = [
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
            frenchWords[index] = {};
          }
          frenchWords[index][form] = word;
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
