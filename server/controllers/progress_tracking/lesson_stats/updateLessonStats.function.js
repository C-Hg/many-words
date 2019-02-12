module.exports = async function updateLessonStats(userStats) {
  console.log(userStats);
  try {
    return await new Promise((resolve, reject) => {
      userStats.save(function(err, newUserStats) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(newUserStats);
        resolve(newUserStats);
      });
    });
  } catch (e) {
    console.log("error while saving lesson stats!");
  }
};
