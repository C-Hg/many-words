import { Document } from "mongoose";
import EnglishWords from "./englishWord.interface";
import FrenchWords from "./frenchWord.interface";

export default interface Word extends Document {
  english: {
    name: string;
    words: EnglishWords[];
  };
  french: {
    name: string;
    words: FrenchWords[];
  };
  hasUniqueForm: boolean;
  type: string;
  lesson: string;
  topic: string;
}
