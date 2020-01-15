import logger from "../logger";
import Word from "../common/models/word.model";

const clearDatabase = async (): Promise<void> => {
  try {
    await Word.deleteMany({});
  } catch (error) {
    if (error)
      logger.error(
        `[clearDatabase] Error while clearing the database - ${error}`
      );
  }
};

export default clearDatabase;
