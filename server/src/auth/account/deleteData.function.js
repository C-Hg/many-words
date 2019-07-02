import User from "../../models/user.model";
import WordStats from "../../models/wordStats.model";

const deleteData = async (userId) => {
  try {
    await WordStats.deleteMany({ userId: userId });
  } catch (e) {
    console.log("error while removing wordStats");
    return false;
  }
  try {
    await User.deleteOne({ _id: userId });
  } catch (e) {
    console.log("error while removing user");
    return false;
  }

  return true;
};

export default deleteData;