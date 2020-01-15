import fs from "fs";
import logger from "../logger";

const updateFiles = async (lessonsByThemes, themes, wordsByLesson) => {
  // destination directories
  const directories = [
    "../server/exercises/FR-EN/",
    "../client/src/exercises/",
  ];

  const dataFiles = [lessonsByThemes, themes, wordsByLesson];

  // write the 3 files necessary to the client and server
  dataFiles.forEach(file => {
    const buffer = Buffer.from(`export default ${JSON.stringify(file)};`);
    fs.writeFile(`${[file].toString()}.js`, buffer, err => {
      if (err) throw err;
      logger.info(`${file.toString()}.js has been saved!`);
      // then copies them in the appropriate directories
      // for (const destination in directories) {
      //   fs.copyFile(
      //     `${entry.toString()}.js`,
      //     `${directories[destination] + entry.toString()}.js`,
      //     err => {
      //       if (err) throw err;
      //       console.log(
      //         `${entry.toString()}.js was copied to ${
      //           directories[destination]
      //         }${entry.toString()}.js`
      //       );
      //     }
      //   );
      // }
    });
  });
};

export default updateFiles;
