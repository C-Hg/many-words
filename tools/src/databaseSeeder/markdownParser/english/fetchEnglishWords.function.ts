import checkEnglishFormat from "./checkEnglishFormat.function";
import getEnglishWordsFromMarkdown from "./getEnglishWordsFromMarkdown.function";
import { EnglishWord } from "./englishWord.interface";

const fetchEnglishWords = (document: string): EnglishWord[] => {
  const englishWords = getEnglishWordsFromMarkdown(document);
  checkEnglishFormat(englishWords);

  return englishWords
};

export default fetchEnglishWords;
