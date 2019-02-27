const WordStats = require("../../../models/wordStats.model");

module.exports = async function getWeakWords(context, reference, userId) {
  // fetches the weak words for logged user, depending on the reference selected
  // (i.e one lesson, one theme or globally)
  let wordStats = "";
  if (context === "global") {
    try {
      wordStats = await WordStats.find({ userId: userId });
    } catch (e) {
      console.log(e);
    }
  } else if (context === "theme") {
    try {
      wordStats = await WordStats.find({ userId: userId, theme: reference });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      wordStats = await WordStats.find({ userId: userId, lesson: reference });
    } catch (e) {
      console.log(e);
    }
  }

  return wordStats;
};
