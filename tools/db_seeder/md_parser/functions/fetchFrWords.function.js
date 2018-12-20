const { checkFrAlternative } = require("./checkFrAlternative.function");
const { checkFrFormat } = require("./checkFrFormat.function");

// successively collects the words from the FR columns
// however if the main column is valid, there is no way to distinguish a formatting error
// in the following columns from void columns

exports.fetchFrWords = function(document) {
  let frWords = [];
  let main = checkFrAlternative("Main", document);
  if (!main) return false;
  if (!checkFrFormat(main)) return false;
  frWords.push(main);

  let altWords = successivelyCheckAltColumns(1, document, []);
  frWords.push(...altWords);
  return frWords;
};

function successivelyCheckAltColumns(i, document, result) {
  let isAlternativeColumnFilled = checkFrAlternative("Alt" + i, document);
  if (isAlternativeColumnFilled) {
    if (checkFrFormat(isAlternativeColumnFilled)) {
      result.push(isAlternativeColumnFilled);
      if (i > 2) return result;
      successivelyCheckAltColumns(i + 1, document, result);
    }
    return result;
  }
  return result;
}
