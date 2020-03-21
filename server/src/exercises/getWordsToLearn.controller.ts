import { Request, Response } from "express";
import Word from "./models/word.model";

const getWordsToLearn = async (req: Request, res: Response): Promise<void> => {
  let words;
  try {
    words = await Word.find(
      { lesson: req.params.lesson },
      "type hasUniqueForm en fr"
    );
    res.send(JSON.stringify(words));
  } catch (error) {
    console.error(
      "[getWordsToLearn] error while fetching words to learn",
      error
    );
  }
};

export default getWordsToLearn;
