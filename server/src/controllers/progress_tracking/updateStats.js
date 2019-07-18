import upsertWordStats from "./upsertWordStats.controller";
import getUpdatedUserStats from "./user_stats/getUpdatedUserStats.function";
import updateUserStats from "./user_stats/updateUserStats.function";

const updateStats = async (req, res) => {
  const exerciseResults = req.body;
  const userId = req.user._id;
  const user = req.user.toObject();

  const lessonsToUpdate = await upsertWordStats(exerciseResults, userId);
  const updatedUserStats = await getUpdatedUserStats(lessonsToUpdate, user);
  console.log("updatedUserStats", updatedUserStats);
  await updateUserStats(user, updatedUserStats);
  res.status(200);
  res.send(updateUserStats);
};

export default updateStats;
