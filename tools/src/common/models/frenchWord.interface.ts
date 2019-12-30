import { Document } from "mongoose";
import FrenchForms from "./frenchForms.interface";

export default interface FrenchWord extends Document {
  uniqueForm?: string;
  singular?: {
    masculine?: string;
    feminine?: string;
  };
  plural?: {
    masculine?: string;
    feminine?: string;
  };
  acceptedForms: (keyof FrenchForms)[];
}
