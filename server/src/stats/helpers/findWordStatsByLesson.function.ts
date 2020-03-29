import { Lesson } from "../../exercises/models/lesson.type";
import User from "../../user/interfaces/user.interface";
import WordStats from "../interfaces/wordStats.interface";
import WordStatsModel from "../models/wordStats.model";

const findWordStatsByLesson = async (
  user: User,
  lesson: Lesson
): Promise<WordStats[]> => {
  try {
    return await WordStatsModel.find({ userId: user, lesson });
  } catch (error) {
    console.error(
      "[findWordStatsByLesson] error while searching word stats by lesson",
      error
    );
  }
  return [];
};

export default findWordStatsByLesson;
