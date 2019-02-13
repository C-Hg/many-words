const WordStats = require("../../models/wordStats.model");
const FR_EN_Themes = require("../../exercises/FR-EN/themes");
const FR_EN_Lessons = require("../../exercises/FR-EN/lessons");
const createOrReplaceLessonStats = require("./createOrReplaceLessonStats.controller");

module.exports = async function getThemesStats(req, res) {
  let themesStats = {};

  createOrReplaceLessonStats(req.user._id, "animals_basics");
  for (let theme of FR_EN_Themes) {
    try {
      let studiedWords = await WordStats.countDocuments({
        userId: req.user._id,
        theme: theme[0]
      });
      themesStats[theme[0]] = {};
      themesStats[theme[0]].studiedWords = studiedWords;
    } catch (e) {
      console.log("error while fetching word stats");
    }
  }
  res.send(JSON.stringify(themesStats));
  return;
};

/* ----------     formats   -----------------

themes:
[
  ["animals", 103],
  ["clothes", 47],
  ["colors", 10]
]

lessons:
{
  animals: [
    ["animals_basics", 10],
    ["birds", 21],
    ["farm_animals", 18],
    ["insects", 20],
    ["mammals_1", 17],
    ["sea_animals", 17]
  ],
  ....
}

*/
