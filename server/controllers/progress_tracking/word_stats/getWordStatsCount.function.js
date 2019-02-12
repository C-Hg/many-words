const WordStats = require("../../../models/wordStats.model");

module.exports = async function getWordCount(req, res) {
  try {
    let wordCount = await WordStats.countDocuments({
      userId: req.user._id
    });
    res.send(JSON.stringify(wordCount));
    return;
  } catch (e) {
    console.log("error while fetching word stats count");
  }
};
