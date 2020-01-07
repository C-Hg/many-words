import fs from "fs";

const readDirectory = async (directory: string): Promise<fs.Dirent[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, { withFileTypes: true }, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export default readDirectory;
