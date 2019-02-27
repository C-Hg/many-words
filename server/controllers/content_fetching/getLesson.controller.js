const Word = require("../../models/word.model");
const findWordStatsByWord = require("../progress_tracking/word_stats/findWordStatsByWord.function");
const mapWordScores = require("./functions/mapWordScores.function");

exports.getLesson = async function(req, res) {
  let words;

  // fetches the words for the lesson
  try {
    words = await Word.find(
      { lesson: req.params.lesson },
      "en_name fr_name lesson theme type hasUniqueForm en fr"
    );
    // sends them as is if user is not logged in
    if (!req.user) {
      res.send(JSON.stringify({ words: words }));
      return;
    }
  } catch (e) {
    console.log("Error while fetching lesson data");
    return;
  }
  // if user is registered, selects the weakest forms
  // wordScores is a parallel array containing scores if they exist,
  // or "null", for each word
  let wordScores = [];
  try {
    for (let word of words) {
      wordScores = [
        ...wordScores,
        await findWordStatsByWord(word.en_name, req.user._id)
      ];
    }

    // filters out the stats of the weakest forms of each word
    let weakestFormsStats = mapWordScores(wordScores);

    res.send(
      JSON.stringify({ words: words, stats_by_form: weakestFormsStats })
    );
  } catch (e) {
    console.log("error while fetching word scores");
  }
};
