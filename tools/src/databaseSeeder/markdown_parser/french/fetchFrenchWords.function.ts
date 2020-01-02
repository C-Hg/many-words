import checkFrenchAlternative from "./checkFrenchAlternative.function";
import checkFrenchFormat from "./checkFrenchFormat.function";

// successively collects the words from the FR columns
// however if the main column is valid, there is no way to distinguish a formatting error
// in the following columns from void columns

const recursivelyCheckAltColumns = (i, document, result) => {
  const isAlternativeColumnFilled = checkFrenchAlternative(`Alt${i}`, document);
  if (isAlternativeColumnFilled) {
    if (checkFrenchFormat(isAlternativeColumnFilled)) {
      result.push(isAlternativeColumnFilled);
      if (i > 2) return result;
      recursivelyCheckAltColumns(i + 1, document, result);
    }
    return result;
  }
  return result;
};

const fetchFrenchWords = document => {
  const frWords = [];
  const main = checkFrenchAlternative("Main", document);
  if (!main) return false;
  if (!checkFrenchFormat(main)) return false;
  frWords.push(main);

  const altWords = recursivelyCheckAltColumns(1, document, []);
  frWords.push(...altWords);
  return frWords;
};

export default fetchFrenchWords;
