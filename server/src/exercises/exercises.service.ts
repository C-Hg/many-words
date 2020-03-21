import Word from "./interfaces/word.interface";
import WordModel from "./models/word.model";

const exercisesService = {
  getWordsForLesson: async (lesson: string): Promise<Word[]> => {
    return await WordModel.find(
      { lesson },
      "enName frName lesson theme type hasUniqueForm en fr"
    );
  },
};

export default exercisesService;
