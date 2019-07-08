import findWordStatsByLesson from "./word_stats/findWordStatsByLesson.function";
import wordCountByLesson from "../../exercises/FR-EN/wordCountByLesson";
import assessLessonStats from "./lesson_stats/assessLessonStats.function";

const updateLessonStats = async (user, lesson) => {
  let wordStats;
  let newScore;

  // gather word stats of the given lesson
  try {
    wordStats = await findWordStatsByLesson(user._id, lesson);
  } catch (e) {
    console.log("error while fetching or creating word stats");
  }
  const theme = wordStats[0].theme;

  // to calculate the lesson score
  newScore = assessLessonStats(wordStats, wordCountByLesson[lesson]);

  // creates theme entry if necessary
  if (!user.stats.lessonsStats[theme]) {
    user.stats.lessonsStats[theme] = {};
  }
  user.stats.lessonsStats[theme][lesson] = newScore;

  return user;
};

export default updateLessonStats;
