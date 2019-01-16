const Word = require("../models/word.model");

exports.getWordsToLearn = async function(req, res) {
  let words;
  try {
    words = await Word.find(
      { lessonName: req.params.lesson },
      "type hasUniqueForm en fr"
    );
    res.send(JSON.stringify(words));
  } catch (e) {
    console.log("Error while fetching words to learn (server side)");
    return;
  }
};
