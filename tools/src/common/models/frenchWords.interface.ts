import { Document } from "mongoose";

// TODO: add an enum for accepted forms to allow strong typing, different for French/English
export default interface FrenchWords extends Document {
  uniqueForm?: string;
  singular?: {
    masculine?: string;
    feminine?: string;
  };
  plural?: {
    masculine?: string;
    feminine?: string;
  };
  acceptedForms: string[];
}
