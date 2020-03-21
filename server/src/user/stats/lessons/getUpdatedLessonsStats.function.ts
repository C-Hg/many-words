/* eslint-disable no-underscore-dangle */
import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";

import findWordStatsByLesson from "../words/helpers/findWordStatsByLesson.function";
import assessLessonStats from "./assessLessonStats.function";
import { Lesson } from "./models/lesson.type";
import User from "../../user/interfaces/user.interface";
import { LessonsStats } from "./interfaces/lessonsStats.interface";
import wordCountByLesson from "../data/wordCountByLesson";

const getUpdatedLessonsStats = async (
  lessons: Lesson[],
  user: User
): Promise<Partial<LessonsStats>> => {
  const updatedLessonsStats: Partial<LessonsStats> = {};

  const updatingLessons = lessons.map(async lesson => {
    // gather word stats of the given lesson
    const wordsStats = await findWordStatsByLesson(user._id, lesson);
    // to calculate the lesson score
    const newScore = assessLessonStats(wordsStats, wordCountByLesson[lesson]);
    // we're mapping through each lesson, gets the topic from the first word of this lesson
    const { topic } = wordsStats[0];
    // creates topic entry if necessary
    if (updatedLessonsStats[topic] === undefined) {
      updatedLessonsStats[topic] = {};
    }
    // updates the lesson score
    updatedLessonsStats[topic][lesson] = newScore;
  });
  try {
    await Promise.all(updatingLessons);
  } catch (error) {
    console.error("Error while getting updated lessons stats", error);
  }

  const lessonsStats = cloneDeep(user.stats.lessons) || {};
  merge(lessonsStats, updatedLessonsStats);
  return lessonsStats;
};

export default getUpdatedLessonsStats;
