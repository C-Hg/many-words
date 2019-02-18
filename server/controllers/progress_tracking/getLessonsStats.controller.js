const UserStats = require("../../models/userStats.model");

module.exports = async function getLessonsStats(req, res) {
  try {
    let userStats = await UserStats.findOne({
      userId: req.user._id
    });
    let lessonsStats;
    if (userStats && userStats.lessonsStats[req.params.theme]) {
      lessonsStats = userStats.lessonsStats[req.params.theme];
    } else lessonsStats = null;
    res.send(JSON.stringify(lessonsStats));
  } catch (e) {
    console.log("error while fetching lessons stats");
  }
};
