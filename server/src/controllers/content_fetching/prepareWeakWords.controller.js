import getWeakWords from "./functions/getWeakWords.function";
import sortWordStats from "./functions/sortWordStats.function";
import mapWordScores from "./functions/mapWordScores.function";
import Word from "../../models/word.model";

const prepareWeakWords = async (req, res) => {
  let wordStats = "";
  let sortedWordStats;
  const words = [];

  try {
    wordStats = await getWeakWords(req.params.reference, req.user._id);
  } catch (e) {
    console.log("error while getting weak words", e);
  }

  if (!wordStats) {
    res.send(JSON.stringify(null));
  }

  sortedWordStats = sortWordStats(wordStats);
  const slicedWordStats = sortedWordStats.slice(0, 50);
  for (const word of slicedWordStats) {
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
  const weakestFormsStats = mapWordScores(slicedWordStats);

  // returns an array of the 50 weakest words (words and weak forms)
  res.send(JSON.stringify({ words, stats_by_form: weakestFormsStats }));
};

export default prepareWeakWords;
