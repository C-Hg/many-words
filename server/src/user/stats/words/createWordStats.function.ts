import Word from "../../../models/word.model";

const createWordStats = async (word, userId) => {
  let wordData;
  try {
    wordData = await Word.findOne({ enName: word }, "en fr lesson theme");
  } catch (error) {
    console.error("[createWordStats] error while fetching word data", error);
  }

  // fills stats indexes for each form of the word

  const enStatsByForm = wordData.en[0].acceptedForms.map(form => ({
    language: "en",
    form,
    score: 0
  }));
  const frStatsByForm = wordData.fr[0].acceptedForms.map(form => ({
    language: "fr",
    form,
    score: 0
  }));
  const statsByForm = [...enStatsByForm, ...frStatsByForm];
  const { lesson, theme } = wordData;

  // other data are completed by default
  const wordStats = {
    userId,
    enName: word,
    statsByForm,
    lesson,
    theme,
    globalScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  };
  return wordStats;
};

export default createWordStats;
