import { Types } from "mongoose";

import exercisesService from "../../exercises/exercises.service";
import FormStats, { Languages } from "../interfaces/formStats.interface";
import { WordStats } from "../interfaces/wordStats.interface";

/**
 * Creates a new wordStats object for a given word
 */
const createWordStats = async (
  userId: Types.ObjectId,
  englishName: string
): Promise<WordStats> => {
  const wordData = await exercisesService.findWordByEnglishName(englishName);

  // fills statsByForm for each form of the word
  const englishStatsByForm = wordData.english.words[0].acceptedForms.map(
    (form) => ({
      form,
      language: Languages.English,
      score: 0,
    })
  );
  const frenchStatsByForm = wordData.french.words[0].acceptedForms.map(
    (form) => ({
      form,
      language: Languages.French,
      score: 0,
    })
  );
  const statsByForm: FormStats[] = [
    ...englishStatsByForm,
    ...frenchStatsByForm,
  ];
  const { lesson, topic } = wordData;

  // other data are completed by default
  const wordStats: WordStats = {
    userId,
    englishName,
    statsByForm,
    lesson,
    topic,
    globalScore: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  };
  return wordStats;
};

export default createWordStats;
