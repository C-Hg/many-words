const FR_EN_Lessons = require("../../exercises/FR-EN/lessons");

/*  ------   see FR_EN_Lessons format for a better understanding   -------- */

module.exports = async function updateThemesStats(user) {
  for (let theme in FR_EN_Lessons) {
    let green = 0;
    let gold = 0;
    for (let lesson of FR_EN_Lessons[theme]) {
      // has user already a score for this lesson?
      if (
        user.lessonsStats[theme] &&
        user.lessonsStats[theme].hasOwnProperty(lesson[0])
      ) {
        if (user.lessonsStats[theme][lesson[0]] >= 0.8) {
          gold++;
        } else if (user.lessonsStats[theme][lesson[0]] >= 0.4) {
          green++;
        }
      }
    }

    if (!user.themesStats[theme]) {
      user.themesStats[theme] = {};
    }
    user.themesStats[theme].gold = gold;
    user.themesStats[theme].green = green;
  }

  return user;
};
