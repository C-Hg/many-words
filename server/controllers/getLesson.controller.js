const Word = require("../models/word.model");

exports.getLesson = async function(req, res) {
  let words;
  try {
    words = await Word.find(
      { lessonName: req.params.lesson },
      "en_name fr_name lessonName type hasUniqueForm en fr"
    );
    res.send(JSON.stringify(words));
  } catch (e) {
    console.log("Error while fetching lesson data");
    return;
  }
};
