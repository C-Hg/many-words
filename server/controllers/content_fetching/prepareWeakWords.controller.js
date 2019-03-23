const getWeakWords = require("./functions/getWeakWords.function");
const sortWordStats = require("./functions/sortWordStats.function");
const mapWordScores = require("./functions/mapWordScores.function");
const Word = require("../../models/word.model");

module.exports = async function prepareWeakWords(req, res) {
  let wordStats = "";
  let sortedWordStats;
  let words = [];

  try {
    wordStats = await getWeakWords(req.params.reference, req.user._id);
  } catch (e) {
    console.log("error while getting weak words", e);
  }

  if (!wordStats) {
    res.send(JSON.stringify(null));
  }

  sortedWordStats = sortWordStats(wordStats);
  let slicedWordStats = sortedWordStats.slice(0, 50);
  for (let word of slicedWordStats) {
    try {
      words.push(
        await Word.findOne(
          { en_name: word.en_name },
          "en_name fr_name lesson theme type hasUniqueForm en fr"
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  // filters out the stats of the weakest forms of each word
  let weakestFormsStats = mapWordScores(slicedWordStats);

  // returns an array of the 50 weakest words (words and weak forms)
  res.send(JSON.stringify({ words: words, stats_by_form: weakestFormsStats }));
};
