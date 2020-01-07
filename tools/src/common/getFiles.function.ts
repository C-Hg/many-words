import path from "path";
import readDirectory from "./readDirectory.function";

// a recursive file explorer that returns the paths for all word files
const getFilesPaths = async directory => {
  let results = [];
  let files;
  try {
    files = await readDirectory(directory);
  } catch (error) {
    console.error(
      `\\033[1;31m[fileExplorer] error while reading directory ${directory}\\033[0;0m`,
      error
    );
  }
  let pending = files.length;
  if (!pending) {
    return results;
  }
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      const nextResults = await getFilesPaths(filePath);
      results = results.concat(nextResults);
      if (!--pending) return results;
    } else {
      results.push(filePath);
      if (!--pending) return results;
    }
  }
};

export default getFilesPaths;
