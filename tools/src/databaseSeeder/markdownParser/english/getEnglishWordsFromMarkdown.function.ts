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
const getEnglishWordsFromMarkdown = (document: string): EnglishWord[] => {
  const { englishFormsRegex } = markdownRegex;
  const englishWords: EnglishWord[] = [];

  englishForms.forEach(form => {
    const startTime = Date.now();
    const words = document.match(englishFormsRegex[form]);
    const step1 = Date.now();
    if (words) {
      // the first match contains all the alternatives, remove it
      words.shift();
      words.forEach((word, index) => {
        if (word !== undefined) {
          if (englishWords[index] === undefined) {
            englishWords[index] = { acceptedForms: [] };
          }
          englishWords[index][form] = word;
          if (!englishWords[index].acceptedForms.includes(form)) {
            englishWords[index].acceptedForms.push(form);
          }
        }
      });
    }
    const step2 = Date.now();
    console.info(`Completion time : ${step1 - startTime} ms.`);
    console.info(`Completion time : ${step2 - startTime} ms.`);
  });

  if (englishWords.length > 0) {
    return englishWords;
  }
  return null;
};

export default getEnglishWordsFromMarkdown;
