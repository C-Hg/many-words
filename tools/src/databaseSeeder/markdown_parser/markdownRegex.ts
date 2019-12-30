import markdownRegex from "./constantRegex";
import MarkdownColumns from "./markdownColumns.interface";

const getRegex = (form: string, column: keyof MarkdownColumns): RegExp => {
  const pattern = markdownRegex[column];
  return RegExp(`${form}${pattern}`, "ig");
};

export default getRegex;
