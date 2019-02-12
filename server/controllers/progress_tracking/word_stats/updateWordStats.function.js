const updateStatsByForm = require("./updateStatsByForm.function");

module.exports = async function updateWordStats(wordStats, exerciseResults) {
  let updatedStats = updateStatsByForm(wordStats, exerciseResults);
  try {
    return await new Promise((resolve, reject) => {
      updatedStats.save(function(err, updatedStats) {
        if (err) reject(err);
        resolve(updatedStats);
      });
    });
  } catch (e) {
    console.log("error while saving word stats");
  }
};
