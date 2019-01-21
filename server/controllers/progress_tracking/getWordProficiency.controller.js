const findWordProficiency = require("./functions/findWordProficiency.function");
const createWordProficiency = require("./functions/createWordProficiency.function");

module.exports = async function getWordProficiency(word, user) {
  let wordProficiency;
  try {
    wordProficiency = await findWordProficiency(word, user);
  } catch (e) {
    console.log("error while fetching word proficiency");
  }
  if (wordProficiency) {
    return wordProficiency;
  }

  try {
    wordProficiency = await createWordProficiency(word, user);
  } catch (e) {
    console.log("error while creating word proficiency");
  }
  return wordProficiency;
};
