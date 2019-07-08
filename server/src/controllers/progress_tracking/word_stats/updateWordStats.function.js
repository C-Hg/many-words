import updateStatsByForm from "./updateStatsByForm.function";

const updateWordStats = async (wordStats, exerciseResults) => {
  const updatedStats = updateStatsByForm(wordStats, exerciseResults);
  try {
    const stats = await updatedStats.save();
    return stats;
  } catch (error) {
    console.error("error while saving word stats", error);
  }
};

export default updateWordStats;
