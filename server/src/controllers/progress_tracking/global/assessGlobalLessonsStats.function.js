const assessGlobalLessonsStats = (lessonsStats, themesStats) => {
  let studiedLessons = 0;
  let greenLessons = 0;
  let goldLessons = 0;

  Object.keys(lessonsStats).forEach(theme => {
    studiedLessons += Object.keys(lessonsStats[theme]).length;
  });
  Object.keys(themesStats).forEach(theme => {
    greenLessons += themesStats[theme].green;
    goldLessons += themesStats[theme].gold;
  });

  return { studiedLessons, greenLessons, goldLessons };
};

export default assessGlobalLessonsStats;
