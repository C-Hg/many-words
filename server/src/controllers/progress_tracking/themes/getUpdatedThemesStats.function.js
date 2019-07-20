import frEnLessons from "../../../exercises/FR-EN/lessonsByThemes";

// TODO: converts lessonsByThemes to objects
const getUpdatedThemesStats = updatedLessonsStats => {
  const updatedThemesStats = {};

  Object.keys(frEnLessons).forEach(theme => {
    let green = 0;
    let gold = 0;

    frEnLessons[theme].forEach(lesson => {
      // has user already a score for this lesson?
      if (updatedLessonsStats[theme] && updatedLessonsStats[theme][lesson[0]]) {
        const lessonScore = updatedLessonsStats[theme][lesson[0]];
        if (lessonScore >= 0.8) {
          gold += 1;
        } else if (lessonScore >= 0.4) {
          green += 1;
        }
      }
    });

    // sums all lessons of the theme
    if (!updatedThemesStats[theme]) {
      updatedThemesStats[theme] = {};
    }
    updatedThemesStats[theme].gold = gold;
    updatedThemesStats[theme].green = green;
  });
  return updatedThemesStats;
};

export default getUpdatedThemesStats;
