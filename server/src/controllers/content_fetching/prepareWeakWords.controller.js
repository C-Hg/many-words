import getWeakWords from "./functions/getWeakWords.function";
import sortWordStats from "./functions/sortWordStats.function";
import getWeakForms from "./functions/getWeakForms.function";
import Word from "../../models/word.model";

const prepareWeakWords = async (req, res) => {
  let wordStats = "";
  const words = [];

  try {
    wordStats = await getWeakWords(req.params.reference, req.user.id);
  } catch (error) {
    console.error(
      "prepareWeakWord.controller: error while getting weak words",
      error
    );
  }

  if (!wordStats) {
    res.send(JSON.stringify(null));
  }

  const sortedWordStats = sortWordStats(wordStats);
  const slicedWordStats = sortedWordStats.slice(0, 50);
  for (const word of slicedWordStats) {
    try {
      words.push(
        await Word.findOne(
          { enName: word.enName },
          "enName frName lesson theme type hasUniqueForm en fr"
        )
      );
    } catch (error) {
      "prepareWeakWord.controller: error while finding word",
        console.error(error);
    }
  }

  // filters out the stats of the weakest forms of each word
  const weakestFormsStats = getWeakForms(slicedWordStats);

  // returns an array of the 50 weakest words (words and weak forms)
  res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
};

export default prepareWeakWords;
