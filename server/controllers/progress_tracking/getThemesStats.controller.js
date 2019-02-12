const WordProficiency = require("../../models/wordProficiency.model");
const FR_EN_Themes = require("../../exercises/FR-EN/themes");
const FR_EN_Lessons = require("../../exercises/FR-EN/lessons");

module.exports = async function getThemesStats(req, res) {
  let themesStats = {};

  for (let theme of FR_EN_Themes) {
    try {
      let studiedWords = await WordProficiency.countDocuments({
        userId: req.user._id,
        theme: theme[0]
      });
      themesStats[theme[0]] = studiedWords;
    } catch (e) {
      console.log("error while fetching word proficiency");
    }
  }
  res.send(JSON.stringify(themesStats));
  return;
};
