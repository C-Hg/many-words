import WordStats from "../../models/words/wordStats.model";

const updateWordStats = async (updatedWordStats, userId) => {
  try {
    updatedWordStats.forEach(async wordStats => {
      await WordStats.replaceOne(
        { enName: wordStats.enName, userId },
        wordStats,
        {
          upsert: true,
        }
      );
    });
  } catch (error) {
    console.error("[updateWordStats] error while saving word stats", error);
  }
};

export default updateWordStats;
