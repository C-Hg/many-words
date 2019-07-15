import merge from "lodash.merge";
import findWordStatsByLesson from "./word_stats/findWordStatsByLesson.function";
import wordCountByLesson from "../../exercises/FR-EN/wordCountByLesson";
import assessLessonStats from "./lesson_stats/assessLessonStats.function";

const getUpdatedLessonsStats = async (lessons, user) => {
  let wordStats;
  let newScore;
  const udpatedLessonsStats = {};

  const updatingLessons = lessons.map(async lesson => {
    // gather word stats of the given lesson
    wordStats = await findWordStatsByLesson(user._id, lesson);
    // to calculate the lesson score
    newScore = assessLessonStats(wordStats, wordCountByLesson[lesson]);
    const { theme } = wordStats[0];
    // creates theme entry if necessary
    if (!udpatedLessonsStats[theme]) {
      udpatedLessonsStats[theme] = {};
    }
    udpatedLessonsStats[theme][lesson] = newScore;
  });
  try {
    await Promise.all(updatingLessons);
  } catch (error) {
    console.error("Error while getting updated lessons stats", error);
  }

  merge(udpatedLessonsStats, user.stats.lessonsStats);
  return udpatedLessonsStats;
};

export default getUpdatedLessonsStats;
