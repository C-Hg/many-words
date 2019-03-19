module.exports = function assessGlobalLessonsStats(user) {
  let lessonsStats = user.lessonsStats;
  let themesStats = user.themesStats;
  let studiedLessons = 0;
  let greenLessons = 0;
  let goldLessons = 0;

  for (let theme in lessonsStats) {
    studiedLessons += Object.keys(lessonsStats[theme]).length;
  }
  for (let theme in themesStats) {
    greenLessons += themesStats[theme].green;
    goldLessons += themesStats[theme].gold;
  }

  return { studiedLessons, greenLessons, goldLessons };
};
