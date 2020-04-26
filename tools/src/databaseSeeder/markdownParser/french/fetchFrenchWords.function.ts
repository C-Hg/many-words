import { FrenchWord } from "./frenchWord.interface";
import getFrenchWordsFromMarkdown from "./getFrenchWordsFromMarkdown.function";
import checkFrenchFormat from "./checkFrenchFormat.function";

const fetchFrenchWords = (document: string): FrenchWord[] => {
  const frenchWords = getFrenchWordsFromMarkdown(document);
  checkFrenchFormat(frenchWords);
  return frenchWords;
};

export default fetchFrenchWords;
