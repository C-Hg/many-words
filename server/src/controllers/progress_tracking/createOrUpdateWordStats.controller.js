import getWordStats from "./getWordStats.controller";
import updateWordStats from "./word_stats/updateWordStats.function";
import updateLessonStats from "./updateLessonStats.controller";
import updateThemesStats from "./updateThemesStats.controller";
import updateGlobalProgress from "./updateGlobalProgress.controller";
import replaceUserStats from "./user_stats/replaceUserStats.function";

const createOrUpdateWordStats = async (req, res) => {
  // data received in an array of arrays :
  // [ [en_name of the word, source_language, form name, answered correctly?], [...], ... ]
  const exerciseResults = req.body;
  const userId = req.user._id;
  const lessons = [];

  // iterating each word studied
  for (const word of exerciseResults) {
    let wordStats;
    try {
      wordStats = await getWordStats(word[0], userId);
    } catch (error) {
      console.error("error while fetching or creating word stats", error);
    }

    try {
      await updateWordStats(wordStats, word);
    } catch (error) {
      console.error("error while updating word stats", error);
    }

    // gather lessons to update
    if (!lessons.includes(wordStats.lesson)) {
      lessons.push(wordStats.lesson);
    }
  }

  // TO BE GATHERED AND OPTIMIZED in a controller ??? assess if parallel runs are possible
  // delete useless try/catch
  let user = req.user.toObject();
  for (const lesson of lessons) {
    try {
      user = await updateLessonStats(user, lesson);
    } catch (error) {
      console.error("error while updating lesson stats", error);
    }
  }

  try {
    user = await updateThemesStats(user);
  } catch (error) {
    console.error("error while updating themes stats", error);
  }

  try {
    user = await updateGlobalProgress(user);
  } catch (error) {
    console.error("error while updating global stats", error);
  }

  // only one writing operation to the db
  try {
    await replaceUserStats(user);
  } catch (error) {
    console.error("error while replacing user stats", error);
  }

  res.send(user.stats);
};

export default createOrUpdateWordStats;
