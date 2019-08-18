import upsertWordStats from "./upsertWordStats.controller";
import getUpdatedUserStats from "./user/getUpdatedUserStats.function";
import updateUserStats from "./user/updateUserStats.function";

const updateStats = async (req, res) => {
  console.debug(`[updateStats] updating stats for user ${req.user.id}`);
  const exerciseResults = req.body;
  const userId = req.user.id;
  const user = req.user.toObject();

  const lessonsToUpdate = await upsertWordStats(exerciseResults, userId);
  const updatedUserStats = await getUpdatedUserStats(lessonsToUpdate, user);

  await updateUserStats(user, updatedUserStats);
  res.status(200);
  res.send(updatedUserStats);
};

export default updateStats;
