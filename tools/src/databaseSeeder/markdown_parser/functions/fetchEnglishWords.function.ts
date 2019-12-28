import checkEnglishAlternative from "./checkEnglishAlternative.function";
import checkEnglishFormat from "./checkEnglishFormat.function";

// successively collects the words from the EN columns
// however if the main column is valid, there is no way to distinguish a formatting error
// in the following columns from void columns

const recursivelyCheckAltColumns = (i, document, result) => {
  const isAlternativeColumnFilled = checkEnglishAlternative(
    `Alt${i}`,
    document
  );
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
  const main = checkEnglishAlternative("Main", document);
  if (!main) return false;
  if (!checkEnglishFormat(main)) return false;
  enWords.push(main);

  const altWords = recursivelyCheckAltColumns(1, document, []);
  enWords.push(...altWords);
  return enWords;
};

export default fetchEnglishWords;
