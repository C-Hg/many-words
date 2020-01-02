import { Document } from "mongoose";
import FrenchForms from "./frenchForms.interface";

export default interface FrenchWord extends Document {
  uniqueForm?: string;
  singularMasculine?: string;
  singularFeminine?: string;
  pluralMasculine?: string;
  pluralFeminine?: string;
  acceptedForms: (keyof FrenchForms)[];
}
