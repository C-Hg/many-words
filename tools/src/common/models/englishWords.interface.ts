import { Document } from "mongoose";

export default interface EnglishWords extends Document {
  uniqueForm?: string;
  singular?: string;
  plural?: string;
  acceptedForms: string[];
}
