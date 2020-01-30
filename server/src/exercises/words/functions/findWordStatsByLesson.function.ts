import WordStats from "../../models/words/wordStats.model";

const findWordStatsByLesson = async (user, lesson) => {
  try {
    return await WordStats.find({ userId: user, lesson });
  } catch (error) {
    console.error(
      "[findWordStatsByLesson] error while searching word stats by lesson",
      error
    );
  }
};

export default findWordStatsByLesson;
