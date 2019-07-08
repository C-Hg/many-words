import WordStats from "../../../models/wordStats.model";

const findWordStatsByLesson = async (user, lesson) => {
  try {
    return await WordStats.find({ userId: user, lesson });
  } catch (e) {
    console.log("error while searching word stats by lesson");
  }
};

export default findWordStatsByLesson;
