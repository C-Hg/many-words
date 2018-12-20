const { checkEnAlternative } = require("./checkEnAlternative.function");
const { checkEnFormat } = require("./checkEnFormat.function");

// successively collects the words from the EN columns
// however if the main column is valid, there is no way to distinguish a formatting error
// in the following columns from void columns

exports.fetchEnWords = function(document) {
  let enWords = [];
  let main = checkEnAlternative("Main", document);
  if (!main) return false;
  if (!checkEnFormat(main)) return false;
  enWords.push(main);

  let altWords = successivelyCheckAltColumns(1, document, []);
  enWords.push(...altWords);
  return enWords;
};

function successivelyCheckAltColumns(i, document, result) {
  let isAlternativeColumnFilled = checkEnAlternative("Alt" + i, document);
  if (isAlternativeColumnFilled) {
    if (checkEnFormat(isAlternativeColumnFilled)) {
      result.push(isAlternativeColumnFilled);
      if (i > 2) return result;
      successivelyCheckAltColumns(i + 1, document, result);
    }
    return result;
  }
  return result;
}
