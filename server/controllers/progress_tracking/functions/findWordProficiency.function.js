const WordProficiency = require("../../../models/wordProficiency.model");

module.exports = async function findWordProficiency(word, user) {
  try {
    return await WordProficiency.findOne({ userId: user, en_name: word });
  } catch (e) {
    console.log("error while searching word proficiency document");
  }
};
