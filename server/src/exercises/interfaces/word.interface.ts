import { Document } from "mongoose";

import { Forms, Languages, Word } from "../../graphql/learn.types";

export interface FormValue {
  form: Forms;
  values: string[];
}

export interface SelectionResult {
  form: Forms;
  language: Languages;
  wordToTranslate: string;
}

export interface WordDocument extends Document, Word {}
