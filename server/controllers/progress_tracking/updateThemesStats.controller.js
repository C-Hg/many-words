const FR_EN_Lessons = require("../../exercises/FR-EN/lessons");
const replaceUserStats = require("./user_stats/replaceUserStats.function");

/*  ------   see FR_EN_Lessons format for a better understanding   -------- */

module.exports = async function updateThemesStats(userStats) {
  for (let theme in FR_EN_Lessons) {
    let green = 0;
    let gold = 0;
    for (let lesson of FR_EN_Lessons[theme]) {
      // has user already a score for this lesson?
      if (
        userStats.lessonsStats[theme] &&
        userStats.lessonsStats[theme].hasOwnProperty(lesson[0])
      ) {
        if (userStats.lessonsStats[theme][lesson[0]] > 0.8) {
          gold++;
        } else if (userStats.lessonsStats[theme][lesson[0]] > 0.2) {
          green++;
        }
      }
    }

    if (green || gold) {
      if (!userStats.themesStats[theme]) {
        userStats.themesStats[theme] = {};
      }
      userStats.themesStats[theme].gold = gold;
      userStats.themesStats[theme].green = green;
    }
  }

  try {
    await replaceUserStats(userStats);
  } catch (e) {
    console.log("error while replacing theme stats");
  }
};
