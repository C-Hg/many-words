const WordStats = require("../../../models/wordStats.model");

module.exports = async function getWordStatsByUser(userId) {
  try {
    return await WordStats.find({
      userId: userId
    });
  } catch (e) {
    console.log("error while fetching word stats count");
  }
};
