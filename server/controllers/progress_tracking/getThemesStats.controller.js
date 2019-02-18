const UserStats = require("../../models/userStats.model");

module.exports = async function getThemesStats(req, res) {
  try {
    let userStats = await UserStats.findOne({
      userId: req.user._id
    });
    if (userStats === null) {
      res.send(JSON.stringify({ response: "No data for this user" }));
      return;
    }
    res.send(JSON.stringify(userStats.themesStats));
  } catch (e) {
    console.log("error while fetching themes stats");
  }
};
