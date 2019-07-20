import WordStats from "../../../models/wordStats.model";

const findWordStatsByWord = async (word, user) => {
  try {
    return await WordStats.findOne({ userId: user, enName: word });
  } catch (e) {
    console.log("error while searching word stats document");
  }
};

export default findWordStatsByWord;
