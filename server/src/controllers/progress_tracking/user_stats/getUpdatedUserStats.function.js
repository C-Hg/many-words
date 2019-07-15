import getUpdatedLessonsStats from "../getUpdatedLessonsStats.function";

const updateUserStats = async (lessonsToUpdate, user) => {
  const updatedLessonsStats = await getUpdatedLessonsStats(
    lessonsToUpdate,
    user
  );

  // TODO : complete me with theme stats and global stats
};

export default updateUserStats;
