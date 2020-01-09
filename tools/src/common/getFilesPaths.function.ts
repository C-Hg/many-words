import fs from "fs";
import path from "path";

/**
 * recursive file explorer
 * @return Array of paths of words' files
 * */
const getFilesPaths = (directory: string): string[] => {
  let results: string[] = [];
  let files;
  try {
    files = fs.readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    console.error(
      `\\033[1;31m[fileExplorer] error while reading directory ${directory}\\033[0;0m`,
      error
    );
  }
  const filesRemaining = files.length;
  if (filesRemaining === 0) {
    return results;
  }
  files.forEach(file => {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      const nextResults = getFilesPaths(filePath);
      results = results.concat(nextResults);
    } else {
      results.push(filePath);
    }
  });
  return results;
};

export default getFilesPaths;
