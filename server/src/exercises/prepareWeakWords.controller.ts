import getWeakWords from "./functions/getWeakWords.function";
import sortWordStats from "./functions/sortWordStats.function";
import getWeakForms from "./functions/getWeakForms.function";
import Word from "../models/word.model";

const prepareWeakWords = async (req, res) => {
  let wordsStats = "";

  try {
    wordsStats = await getWeakWords(req.params.reference, req.user.id);
  } catch (error) {
    console.error(
      "[prepareWeakWord.controller] error while getting weak words",
      error
    );
  }

  if (!wordsStats) {
    res.send(JSON.stringify(null));
  }

  const sortedWordsStats = sortWordStats(wordsStats);
  const slicedWordsStats = sortedWordsStats.slice(0, 50);
  let words = [];

  try {
    words = await Promise.all(
      slicedWordsStats.map(async wordStats => {
        const word = await Word.findOne(
          { enName: wordStats.enName },
          "enName frName lesson theme type hasUniqueForm en fr"
        );
        return word;
      })
    );
  } catch (error) {
    console.error(
      "[prepareWeakWord.controller] error while finding word",
      error
    );
  }

  // filters out the stats of the weakest forms of each word
  const weakestFormsStats = getWeakForms(slicedWordsStats);

  // returns an array of the 50 weakest words (words and weak forms)
  res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
};

export default prepareWeakWords;
