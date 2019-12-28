import Word from "../common/models/word.model";

const clearDatabase = async () => {
  try {
    await Word.deleteMany();
    return;
  } catch (error) {
    if (error)
      console.error(
        `\\033[1;31m Error while clearing the database\\033[0;0m`,
        error
      );
  }
};

export default clearDatabase;
