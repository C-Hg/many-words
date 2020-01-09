import EnglishWord from "./englishWord.interface";
import checkEnglishFormat from "./checkEnglishFormat.function";
import getEnglishWordsFromMarkdown from "./getEnglishWordsFromMarkdown.function";

const fetchEnglishWords = (document: string): EnglishWord[] => {
  const englishWords = getEnglishWordsFromMarkdown(document);
  const areWordsProperlyFormatted = checkEnglishFormat(englishWords);
  if (areWordsProperlyFormatted) {
    return englishWords;
  }
  return null;
};

export default fetchEnglishWords;
