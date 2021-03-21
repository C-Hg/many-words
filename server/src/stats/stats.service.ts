import WordResult from "./interfaces/wordResult.interface";
import { WordStatsDocument } from "./interfaces/wordStats.interface";
import WordStatsModel from "./models/wordStats.model";

import CurriculumModel from "../exercises/models/curriculum.model";
import {
  CurriculumDocument,
  LessonCompletion,
} from "../exercises/types/curriculum.interface";
import { CurriculumStats, Word } from "../graphql/types";
import error500 from "../utils/errors/error500";
import logger from "../utils/logger";

const statsService = {
  getCurriculum: async (userId: string): Promise<CurriculumDocument> => {
    const curriculum = await CurriculumModel.findOne({ userId });
    if (!curriculum) {
      logger.error(`[getCurriculum] cannot find curriculum for user ${userId}`);
      throw error500;
    }
    return curriculum;
  },

  findWordsStatsForWords: async (
    userId: string,
    words: Word[]
  ): Promise<(WordStatsDocument | null)[]> => {
    return Promise.all(
      words.map(async (word) => {
        const wordStats = await statsService.findWordStatsByEnglishName(
          userId,
          word.english.name
        );
        return wordStats;
      })
    );
  },

  findWordStatsByEnglishName: async (
    userId: string,
    englishName: string
  ): Promise<WordStatsDocument | null> => {
    return WordStatsModel.findOne({ userId, englishName });
  },

  // TODO: test me
  updateWordsStats: async (
    userId: string,
    WordsResults: WordResult[]
  ): Promise<void> => {
    const replacePromises = WordsResults.map(async (wordResults) => {
      const { wordStats } = wordResults;
      return WordStatsModel.updateOne(
        { englishName: wordStats.englishName, userId },
        wordStats,
        { upsert: true }
      );
    });
    await Promise.all(replacePromises);
  },

  /**
   * Update curriculum stats by user _id
   */
  updateCurriculumStats: async (
    lessons: LessonCompletion[],
    userId: string,
    updatedStats: CurriculumStats
  ): Promise<CurriculumDocument> => {
    const updatedCurriculum = await CurriculumModel.findOneAndUpdate(
      { userId },
      {
        lessons,
        stats: updatedStats,
      },
      { new: true }
    );
    if (!updatedCurriculum) {
      logger.error(`[updateStats] cannot update curriculum for ${userId}`);
      throw error500;
    }
    return updatedCurriculum;
  },
};

export default statsService;
