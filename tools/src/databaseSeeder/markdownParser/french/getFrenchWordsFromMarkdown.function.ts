import markdownRegex from "../markdownRegex";

import getWordsFromMarkdownByLine from "../getWordsFromMarkdownByLine.function";
import { FrenchWord, FrenchForms } from "./frenchWord.interface";
import checkFrenchFormat from "./checkFrenchFormat.function";

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
const getFrenchWordsFromMarkdown = (document: string): FrenchWord => {
  const { formsRegex } = markdownRegex;
  const frenchWord: FrenchWord = [];

  frenchForms.forEach((form) => {
    const words = getWordsFromMarkdownByLine(document, formsRegex.french[form]);
    if (words.length > 0) {
      frenchWord.push({
        form,
        values: words,
      });
    }
  });

  checkFrenchFormat(frenchWord);

  return frenchWord;
};

export default getFrenchWordsFromMarkdown;
