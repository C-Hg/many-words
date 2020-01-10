import Word from "./models/word.model";

const clearDatabase = async (): Promise<void> => {
  try {
    await Word.deleteMany({});
  } catch (error) {
    if (error)
      console.error(`[clearDatabase] Error while clearing the database`, error);
  }
};

export default clearDatabase;
