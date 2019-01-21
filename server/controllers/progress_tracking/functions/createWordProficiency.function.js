const Word = require("../../../models/word.model");
const WordProficiency = require("../../../models/wordProficiency.model");

module.exports = async function createWordProficiency(word, user) {
  let wordData;
  try {
    wordData = await Word.findOne({ en_name: word }, "en fr");
  } catch (e) {
    console.log("error while fetching word data");
  }

  //fills proficiency indexes for each form of the word
  let proficiencyIndexes = [];
  for (let form of wordData.en[0].acceptedForms) {
    proficiencyIndexes.push({
      language: "en",
      form: form,
      proficiency: 0
    });
  }
  for (let form of wordData.fr[0].acceptedForms) {
    proficiencyIndexes.push({
      language: "fr",
      form: form,
      proficiency: 0
    });
  }

  //other data are completed by default
  let wordProficiency = new WordProficiency({
    userId: user,
    en_name: word,
    proficiencyIndexes: proficiencyIndexes
  });
  return wordProficiency;
};
