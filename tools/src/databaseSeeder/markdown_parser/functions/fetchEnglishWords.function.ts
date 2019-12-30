import checkEnglishAlternative from "./checkEnglishAlternative.function";
import checkEnglishFormat from "./checkEnglishFormat.function";

// successively collects the words from the EN columns
// however if the main column is valid, there is no way to distinguish a formatting error
// in the following columns from void columns

const recursivelyCheckAltColumns = (i: 1 | 2 | 3, document, result) => {
  const column = `alt${i.toString()}`;
  const isAlternativeColumnFilled = checkEnglishAlternative(column, document);
  if (isAlternativeColumnFilled) {
    if (checkEnglishFormat(isAlternativeColumnFilled)) {
      result.push(isAlternativeColumnFilled);
      if (i > 2) return result;
      recursivelyCheckAltColumns(i + 1, document, result);
    }
    return result;
  }
  return result;
};

const fetchEnglishWords = document => {
  const enWords = [];
  const mainWord = checkEnglishAlternative("main", document);
  if (!mainWord) return null;
  if (!checkEnglishFormat(mainWord)) return false;
  enWords.push(main);

  const altWords = recursivelyCheckAltColumns(1, document, []);
  enWords.push(...altWords);
  return enWords;
};

export default fetchEnglishWords;
