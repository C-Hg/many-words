const Word = require("../../../models/word.model");
const WordStats = require("../../../models/wordStats.model");

module.exports = async function createWordStats(word, user) {
  let wordData;
  try {
    wordData = await Word.findOne({ en_name: word }, "en fr lesson theme");
  } catch (e) {
    console.log("error while fetching word data");
  }

  //fills stats indexes for each form of the word
  let stats_by_form = [];
  for (let form of wordData.en[0].acceptedForms) {
    stats_by_form.push({
      language: "en",
      form: form,
      score: 0
    });
  }
  for (let form of wordData.fr[0].acceptedForms) {
    stats_by_form.push({
      language: "fr",
      form: form,
      score: 0
    });
  }

  //other data are completed by default
  let wordStats = new WordStats({
    userId: user,
    en_name: word,
    stats_by_form: stats_by_form,
    lesson: wordData.lesson,
    theme: wordData.theme
  });
  return wordStats;
};
