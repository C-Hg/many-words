import markdownRegex from "./constantRegex";

const getRegex = (form: string): RegExp => {
  const { matchFourWords } = markdownRegex;
  return RegExp(`${form}${matchFourWords}`, "i");
};

export default getRegex;
