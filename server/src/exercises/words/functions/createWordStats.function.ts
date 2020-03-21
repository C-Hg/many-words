import Word from "../models/words/word.model";
import WordStatsModel from "../models/words/wordStats.model";

const createWordStats = async (word, userId) => {
  let wordData;
  try {
    wordData = await Word.findOne({ enName: word }, "en fr lesson theme");
  } catch (error) {
    console.error("[createWordStats] error while fetching word data", error);
  }
  if (!wordData) {
    console.error(`[createWordStats] cannot fetch word data for ${word}`);
    return;
  }

  // fills stats indexes for each form of the word
  const enStatsByForm = wordData.english.words[0].acceptedForms.map(form => ({
    language: "english",
    form,
    score: 0,
  }));
  const frStatsByForm = wordData.french.words[0].acceptedForms.map(form => ({
    language: "french",
    form,
    score: 0,
  }));
  const statsByForm = [...enStatsByForm, ...frStatsByForm];
  const { lesson, topic } = wordData;

  // other data are completed by default
  const wordStats = new WordStatsModel({
    userId,
    enName: word,
    statsByForm,
    lesson,
    topic,
    globalScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  return wordStats;
};

export default createWordStats;
