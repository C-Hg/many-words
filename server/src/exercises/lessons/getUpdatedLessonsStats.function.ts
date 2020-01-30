/* eslint-disable no-underscore-dangle */
import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";
import findWordStatsByLesson from "../words/functions/findWordStatsByLesson.function";
import wordCountByLesson from "../../../exercises/FR-EN/wordCountByLesson";
import assessLessonStats from "./assessLessonStats.function";
import { Lesson } from "./models/lesson.type";
import User from "../../user/models/user.interface";
import { LessonsStats } from "./models/lessonsStats.interface";

const getUpdatedLessonsStats = async (
  lessons: Lesson[],
  user: User
): Promise<Partial<LessonsStats>> => {
  const udpatedLessonsStats: Partial<LessonsStats> = {};

  const updatingLessons = lessons.map(async lesson => {
    // gather word stats of the given lesson
    const wordsStats = await findWordStatsByLesson(user._id, lesson);
    // to calculate the lesson score
    const newScore = assessLessonStats(wordsStats, wordCountByLesson[lesson]);
    // we're mapping through each lesson, gets the topic from the first word of this lesson
    const { topic } = wordsStats[0];
    // creates topic entry if necessary
    if (!udpatedLessonsStats[topic]) {
      udpatedLessonsStats[topic] = {};
    }
    udpatedLessonsStats[topic][lesson] = newScore;
  });
  try {
    await Promise.all(updatingLessons);
  } catch (error) {
    console.error("Error while getting updated lessons stats", error);
  }

  const lessonsStats = cloneDeep(user.stats.lessons) || {};
  merge(lessonsStats, udpatedLessonsStats);
  return lessonsStats;
};

export default getUpdatedLessonsStats;
