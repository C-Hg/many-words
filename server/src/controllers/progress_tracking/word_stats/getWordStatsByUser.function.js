import WordStats from "../../../models/wordStats.model";

const getWordStatsByUser = async userId => {
  try {
    return await WordStats.find({
      userId
    });
  } catch (e) {
    console.log("error while fetching word stats count");
  }
};

export default getWordStatsByUser;
