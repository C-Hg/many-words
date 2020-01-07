import { Document } from "mongoose";
import EnglishForms from "./englishForms.interface";

export default interface EnglishWord extends Document {
  uniqueForm?: string;
  singular?: string;
  plural?: string;
  acceptedForms: (keyof EnglishForms)[];
}
