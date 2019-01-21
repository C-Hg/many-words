const updateEfficiencyIndexes = require("./updateEfficiencyIndexes.function");

module.exports = async function updateWordProficiency(
  proficiencyStats,
  wordStats
) {
  let updatedProficiencyStats = updateEfficiencyIndexes(
    proficiencyStats,
    wordStats
  );
  try {
    return await new Promise((resolve, reject) => {
      updatedProficiencyStats.save(function(err, updatedStats) {
        if (err) reject(err);
        resolve(updatedStats);
      });
    });
  } catch (e) {
    console.log("error while saving proficiency stats");
  }
  return updatedProficiencyStats;
};
