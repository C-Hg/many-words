const Word = require("../../models/word.model");
const findWordProficiency = require("../progress_tracking/functions/findWordProficiency.function");
const mapWordProficiencies = require("./functions/mapWordProficiencies.function");

exports.getLesson = async function(req, res) {
  let words;

  // fetches the words for the lesson
  try {
    words = await Word.find(
      { lesson: req.params.lesson },
      "en_name fr_name lesson type hasUniqueForm en fr"
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
  // wordProficiencies is a parallel array containing proficiencies if they exist,
  // or "null", for each word
  let wordProficiencies = [];
  try {
    for (let word of words) {
      wordProficiencies = [
        ...wordProficiencies,
        await findWordProficiency(word.en_name, req.user._id)
      ];
    }

    // filters out only proficiency indexes
    let proficiencyIndexes = mapWordProficiencies(wordProficiencies);

    res.send(
      JSON.stringify({ words: words, proficiencyIndexes: proficiencyIndexes })
    );
  } catch (e) {
    console.log("error while fetching proficiencies");
  }
};
