export type EnglishForms = "uniqueForm" | "singular" | "plural";

export type EnglishFormValue = {
  form: EnglishForms;
  values: string[];
};

export type EnglishWord = EnglishFormValue[];
