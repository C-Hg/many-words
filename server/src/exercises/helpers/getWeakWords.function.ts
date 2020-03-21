import WordStats from "../../user/stats/words/models/wordStats.model";

const getWeakWords = async (reference, userId) => {
  // fetches the weak words for logged user, depending on the reference selected
  // (i.e one theme or globally)
  let wordStats = null;
  if (reference === "curriculum") {
    try {
      wordStats = await WordStats.find({ userId });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      wordStats = await WordStats.find({ userId, theme: reference });
    } catch (error) {
      console.error(error);
    }
  }

  return wordStats;
};

export default getWeakWords;
