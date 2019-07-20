import WordStats from "../../../models/wordStats.model";

const findWordStatsByLesson = async (user, lesson) => {
  try {
    return await WordStats.find({ userId: user, lesson });
  } catch (error) {
    console.error("error while searching word stats by lesson", error);
  }
};

export default findWordStatsByLesson;
