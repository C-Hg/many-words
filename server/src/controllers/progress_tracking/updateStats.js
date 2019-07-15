import upsertWordStats from "./upsertWordStats.controller";
import getUpdatedUserStats from "./user_stats/getUpdatedUserStats.function";

const updateStats = async (req, res) => {
  const exerciseResults = req.body;
  const userId = req.user._id;
  const user = req.user.toObject();

  const lessonsToUpdate = await upsertWordStats(exerciseResults, userId);
  const updatedUserStats = await getUpdatedUserStats(lessonsToUpdate, user);

  // TODO: return user to the client :)
};

export default updateStats;
