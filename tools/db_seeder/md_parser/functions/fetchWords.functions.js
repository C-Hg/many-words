const regex = require("../mdRegex");
const { checkEnAlternative } = require("./checkEnAlternative.function");

exports.fetchEnWords = function(document) {
  let main = checkEnAlternative("Main", document);
  console.log(main);
};
