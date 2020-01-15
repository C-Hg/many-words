import { Document } from "mongoose";
import EnglishWord from "../../databaseSeeder/markdownParser/english/englishWord.interface";
import FrenchWord from "../../databaseSeeder/markdownParser/french/frenchWord.interface";

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
