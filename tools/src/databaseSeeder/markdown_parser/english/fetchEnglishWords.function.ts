import EnglishWord from "../../../common/models/englishWord.interface";
import checkEnglishFormat from "./checkEnglishFormat.function";
import getEnglishWordsFromMarkdown from "./getEnglishWordsFromMarkdown.function";

const fetchEnglishWords = (document: string): Partial<EnglishWord>[] => {
  const englishWords = getEnglishWordsFromMarkdown(document);
  const areWordsProperlyFormatted = checkEnglishFormat(englishWords);
  if (areWordsProperlyFormatted) {
    return englishWords;
  }
  return null;
};

export default fetchEnglishWords;
