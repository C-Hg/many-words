import { Document } from "mongoose";
import EnglishWord from "./englishWord.interface";
import FrenchWord from "./frenchWord.interface";
import FormStats from "../../user/stats/interfaces/formStats.interface";

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
  weakestForms?: FormStats[];
}
