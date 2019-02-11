const WordProficiency = require("../../models/wordProficiency.model");

module.exports = async function getThemesStats(req, res) {
  let themesStats = {};

  // the adjacent number is the total number of words per theme, for stats tracking
  const themes = [
    ["animals", 103],
    ["clothes", 47],
    ["colors", 10],
    ["food", 95],
    ["habitation", 82],
    ["human_body", 76],
    ["nature", 79],
    ["numbers", 32],
    ["social_life", 51],
    ["time", 79],
    ["vegetals", 35]
  ];
  for (let theme of themes) {
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
