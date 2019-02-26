const WordStats = require("../../../models/wordStats.model");

module.exports = async function findWordStatsByWord(word, user) {
  try {
    return await WordStats.findOne({ userId: user, en_name: word });
  } catch (e) {
    console.log("error while searching word stats document");
  }
};