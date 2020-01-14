import markdownRegex from "./markdownRegex";

const columns = [
  "firstColumn",
  "secondColumn",
  "thirdColumn",
  "fourthColumn",
] as const;

const getFormFromColumn = (
  document: string,
  column: typeof columns[number],
  formRegex: string
): string => {
  const regex = RegExp(formRegex + markdownRegex[column], "i");
  const result = document.match(regex);
  if (result !== null) {
    return result[0];
  }
  return null;
};

const getWordsFromMarkdownByLine = (
  document: string,
  formRegex: string
): string[] => {
  const results = [];

  while (results.length < 3) {
    const word = getFormFromColumn(
      document,
      columns[results.length],
      formRegex
    );
    if (word !== null) {
      results.push(word);
    } else {
      return results;
    }
  }

  return results;
};

export default getWordsFromMarkdownByLine;
