import { EnglishForms, EnglishWord } from "./englishWord.interface";
import markdownRegex from "../markdownRegex";
import getWordsFromMarkdownByLine from "../getWordsFromMarkdownByLine.function";
import checkEnglishFormat from "./checkEnglishFormat.function";

const englishForms: EnglishForms[] = ["singular", "plural", "uniqueForm"];

/**
 * Fetches the data from all columns in the English table of the Markdown document
 * Data still needs validation, done by checkEnglishFormat function
 */
const getEnglishWordsFromMarkdown = (document: string): EnglishWord => {
  const { formsRegex } = markdownRegex;
  const englishWord: EnglishWord = [];

  englishForms.forEach((form) => {
    const words = getWordsFromMarkdownByLine(
      document,
      formsRegex.english[form]
    );
    if (words.length > 0) {
      englishWord.push({
        form,
        values: words,
      });
    }
  });

  checkEnglishFormat(englishWord);

  return englishWord;
};

export default getEnglishWordsFromMarkdown;
