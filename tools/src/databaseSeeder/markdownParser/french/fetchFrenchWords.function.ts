import FrenchWord from "./frenchWord.interface";
import getFrenchWordsFromMarkdown from "./getFrenchWordsFromMarkdown.function";
import checkFrenchFormat from "./checkFrenchFormat.function";

const fetchFrenchWords = (document: string): FrenchWord[] => {
  const frenchWords = getFrenchWordsFromMarkdown(document);
  const areWordsProperlyFormatted = checkFrenchFormat(frenchWords);
  if (areWordsProperlyFormatted) {
    return frenchWords;
  }
  throw new Error()
};

export default fetchFrenchWords;
