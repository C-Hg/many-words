import fs from "fs";

const readFile = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export default readFile;
