const assessGlobalLessonsStats = user => {
  const lessonsStats = user.stats.lessonsStats;
  const themesStats = user.stats.themesStats;
  let studiedLessons = 0;
  let greenLessons = 0;
  let goldLessons = 0;

  for (const theme in lessonsStats) {
    studiedLessons += Object.keys(lessonsStats[theme]).length;
  }
  for (const theme in themesStats) {
    greenLessons += themesStats[theme].green;
    goldLessons += themesStats[theme].gold;
  }

  return { studiedLessons, greenLessons, goldLessons };
};

export default assessGlobalLessonsStats;
