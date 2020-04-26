import  { EnglishForms, EnglishWord } from "./englishWord.interface";
import markdownRegex from "../markdownRegex";
import getWordsFromMarkdownByLine from "../getWordsFromMarkdownByLine.function";

const englishForms: EnglishForms[] = [
  "singular",
  "plural",
  "uniqueForm",
];

/**
 * Fetches the data from all columns in the English table of the Markdown document
 * Data still needs validation, done by checkEnglishFormat function
 */
const getEnglishWordsFromMarkdown = (document: string): EnglishWord[] => {
  const { formsRegex } = markdownRegex;
  const englishWords: EnglishWord[] = [];

  englishForms.forEach(form => {
    const words = getWordsFromMarkdownByLine(
      document,
      formsRegex.english[form]
    );
    if (words) {
      words.forEach((word, index) => {
        if (word !== undefined) {
          if (englishWords[index] === undefined) {
            englishWords[index] = {};
          }
          englishWords[index][form] = word;
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
