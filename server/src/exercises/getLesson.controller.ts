import { Request, Response } from "express";
import Word from "../models/word.model";
import findWordStatsByWord from "../user/stats/words/findWordStatsByWord.function";
import getWeakForms from "./functions/getWeakForms.function";

const getLesson = async (req: Request, res: Response): Promise<void> => {
  let words;

  // fetches the words for the lesson
  try {
    words = await Word.find(
      { lesson: req.params.lesson },
      "enName frName lesson theme type hasUniqueForm en fr"
    );
    // sends them as is if user is not logged in
    if (!req.user) {
      res.send(JSON.stringify({ words }));
      return;
    }
  } catch (error) {
    console.error(
      "[getLesson.controller] error while fetching lesson data",
      error
    );
    return;
  }
  // if user is registered, selects the weakest forms
  // wordScores is a parallel array containing scores if they exist,
  // or "null", for each word

  try {
    const wordScores = await Promise.all(
      words.map(async word => {
        const wordScore = await findWordStatsByWord(
          word.english.name,
          req.user.id
        );
        return wordScore;
      })
    );

    // filters out the stats of the weakest forms of each word
    const weakestFormsStats = getWeakForms(wordScores);
    res.send(JSON.stringify({ words, statsByForm: weakestFormsStats }));
    console.debug(
      `[getLesson.controller] sent words for lesson ${req.params.lesson}`
    );
  } catch (error) {
    console.error(
      "[getLesson.controller] error while fetching word scores",
      error
    );
  }
};

export default getLesson;
