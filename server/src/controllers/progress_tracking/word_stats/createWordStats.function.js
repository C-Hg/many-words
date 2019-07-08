import Word from "../../../models/word.model";
import WordStats from "../../../models/wordStats.model";

const createWordStats = async (word, user) => {
  let wordData;
  try {
    wordData = await Word.findOne({ en_name: word }, "en fr lesson theme");
  } catch (e) {
    console.log("error while fetching word data");
  }

  // fills stats indexes for each form of the word
  const stats_by_form = [];
  for (const form of wordData.en[0].acceptedForms) {
    stats_by_form.push({
      language: "en",
      form,
      score: 0
    });
  }
  for (const form of wordData.fr[0].acceptedForms) {
    stats_by_form.push({
      language: "fr",
      form,
      score: 0
    });
  }

  // other data are completed by default
  const wordStats = new WordStats({
    userId: user,
    en_name: word,
    stats_by_form,
    lesson: wordData.lesson,
    theme: wordData.theme
  });
  return wordStats;
};

export default createWordStats;
