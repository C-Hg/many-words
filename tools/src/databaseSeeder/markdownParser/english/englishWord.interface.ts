export type EnglishForms = "uniqueForm" | "singular" | "plural"

export type EnglishWord = {
  [K in EnglishForms]?: string
}
