const WordProficiency = require("../../models/wordProficiency.model");

module.exports = async function getWordCount(req, res) {
  try {
    let wordCount = await WordProficiency.countDocuments({
      userId: req.user._id
    });
    res.send(JSON.stringify(wordCount));
    return;
  } catch (e) {
    console.log("error while fetching word proficiency");
  }
};
