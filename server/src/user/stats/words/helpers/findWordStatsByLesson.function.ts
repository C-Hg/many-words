import User from "../../../user/interfaces/user.interface";
import { Lesson } from "../../lessons/models/lesson.type";
import WordStatsInterface from "../interfaces/wordStats.interface";
import wordStatsModel from "../models/words/wordStats.model";

const findWordStatsByLesson = async (
  user: User,
  lesson: Lesson
): Promise<WordStatsInterface[]> => {
  try {
    return await wordStatsModel.find({ userId: user, lesson });
  } catch (error) {
    console.error(
      "[findWordStatsByLesson] error while searching word stats by lesson",
      error
    );
  }
  return [];
};

export default findWordStatsByLesson;
