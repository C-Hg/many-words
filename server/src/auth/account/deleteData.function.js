import User from "../../models/user.model";
import WordStats from "../../models/wordStats.model";

const deleteData = async userId => {
  try {
    await WordStats.deleteMany({ userId });
  } catch (error) {
    console.error("[deleteData] error while removing wordStats", error);
    return false;
  }
  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    console.error("[deleteData] error while removing user", error);
    return false;
  }

  return true;
};

export default deleteData;
