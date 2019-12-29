import Word from "../common/models/word.model";

const clearDatabase = async (): Promise<void> => {
  try {
    await Word.deleteMany({});
  } catch (error) {
    if (error)
      console.error(
        `\\033[1;31m Error while clearing the database\\033[0;0m`,
        error
      );
  }
};

export default clearDatabase;
