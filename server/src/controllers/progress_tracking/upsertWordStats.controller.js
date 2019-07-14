import updateWordStats from "./word_stats/updateWordStats.function";
import updateLessonStats from "./updateLessonStats.controller";
import updateThemesStats from "./updateThemesStats.controller";
import updateGlobalProgress from "./updateGlobalProgress.controller";
import replaceUserStats from "./user_stats/replaceUserStats.function";
import getUpdatedWordStats from "./word_stats/getUpdatedWordStats.function";
import getOrCreateWordStats from "./word_stats/getOrCreateWordStats.function";

const upsertWordStats = async (req, res) => {
  // data received in an array of arrays :
  // [ [enName of the word, source_language, form name, answered correctly?], [...], ... ]
  const exerciseResults = req.body;
  const userId = req.user._id;
  const lessons = [];

  const allWordStats = await getOrCreateWordStats(exerciseResults, userId);
  const updatedWordStats = await getUpdatedWordStats(
    allWordStats,
    exerciseResults
  );
  console.log(updatedWordStats);
  updateWordStats(updatedWordStats, userId);
  // TODO: split me here (wordStats and userStats)

  // TODO: create a function to gather lessons from allWordStats
  // gather lessons to update
  // if (!lessons.includes(wordStats.lesson)) {
  //   lessons.push(wordStats.lesson);
  // }

  // TO BE GATHERED AND OPTIMIZED in a controller ??? assess if parallel runs are possible
  // delete useless try/catch
  // let user = req.user.toObject();
  // for (const lesson of lessons) {
  //   try {
  //     user = await updateLessonStats(user, lesson);
  //   } catch (error) {
  //     console.error("error while updating lesson stats", error);
  //   }
  // }

  // try {
  //   user = await updateThemesStats(user);
  // } catch (error) {
  //   console.error("error while updating themes stats", error);
  // }

  // try {
  //   user = await updateGlobalProgress(user);
  // } catch (error) {
  //   console.error("error while updating global stats", error);
  // }

  // // only one writing operation to the db
  // try {
  //   await replaceUserStats(user);
  // } catch (error) {
  //   console.error("error while replacing user stats", error);
  // }

  // TODO : send user stats in response
  res.send("ok");
};

export default upsertWordStats;
