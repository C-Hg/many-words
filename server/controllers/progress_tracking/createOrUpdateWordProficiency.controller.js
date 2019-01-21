const getWordProficiency = require("./getWordProficiency.controller");
const updateWordProficiency = require("./functions/updateWordProficiency.function");

module.exports = async function createOrUpdateWordProficiency(req, res) {
  // data received in an array of arrays :
  // [ [en_name of the word, source_language, form name, answered correctly?], [...], ... ]

  let wordsStats = req.body;
  let user_id = req.user._id;

  //iterating each word studied
  for (let word of wordsStats) {
    let proficiencyStats;
    try {
      proficiencyStats = await getWordProficiency(word[0], user_id);
    } catch (e) {
      console.log("error while fetching or creating word proficiency");
    }

    try {
      await updateWordProficiency(proficiencyStats, word);
    } catch (e) {
      console.log("error while updating word proficiency");
    }
  }

  res.send("all good");
};
