import Word from "../../models/word.model";
import findWordStatsByWord from "../progress_tracking/word_stats/findWordStatsByWord.function";
import mapWordScores from "./functions/mapWordScores.function";

const getLesson = async (req, res) => {
  let words;

  // fetches the words for the lesson
  try {
    words = await Word.find(
      { lesson: req.params.lesson },
      "enName frName lesson theme type hasUniqueForm en fr"
    );
    // sends them as is if user is not logged in
    if (!req.user) {
      res.send(JSON.stringify({ words }));
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
    for (const word of words) {
      wordScores = [
        ...wordScores,
        await findWordStatsByWord(word.enName, req.user._id)
      ];
    }

    // filters out the stats of the weakest forms of each word
    const weakestFormsStats = mapWordScores(wordScores);

    res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
  } catch (e) {
    console.log("error while fetching word scores");
  }
};

export default getLesson;
