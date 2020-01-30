import { Document } from "mongoose";
import EnglishWord from "../wordForms/englishWord.interface";
import FrenchWord from "../wordForms/frenchWord.interface";

export default interface Word extends Document {
  english: {
    name: string;
    words: EnglishWord[];
  };
  french: {
    name: string;
    words: FrenchWord[];
  };
  hasUniqueForm: boolean;
  type: string;
  lesson: string;
  topic: string;
}
