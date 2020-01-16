import fs from "fs";
import logger from "../logger";

interface Topic {
  name: string;
  lessonsCount: number;
}

interface GlobalStats {
  wordsCount: number;
  lessonsCount: number;
  topicsCount: number;
}

const updateFiles = async (
  lessonsByTopic: { [k: string]: string[] },
  topicsWithLessonsCount: Topic[],
  wordCountByLesson: { [k: string]: number },
  globalStats: GlobalStats
): Promise<void> => {
  const startTime = Date.now();
  logger.info("preparing to write files");

  const dataFiles = [
    { name: "lessonsByTopic", data: lessonsByTopic },
    { name: "topicsWithLessonsCount", data: topicsWithLessonsCount },
    { name: "wordCountByLesson", data: wordCountByLesson },
    { name: "globalStats", data: globalStats },
  ];

  // destination directories
  const clientFolderPath = "../../client/src/data/";
  const serverFolderPath = "../../server/src/exercises/";

  // write the 4 files
  const writeFiles = async (
    extension: "ts" | "js",
    destination: string
  ): Promise<void[]> => {
    logger.info(`writing in ${destination}\n`);
    const promises = dataFiles.map(file => {
      const buffer = Buffer.from(
        `const ${file.name} = ${JSON.stringify(file.data)};

        export default ${file.name}`
      );
      return new Promise<void>(done => {
        fs.writeFile(`${destination}${file.name}.${extension}`, buffer, err => {
          if (err) throw err;
          done();
          logger.info(`${file.name}.${extension}`);
        });
      });
    });
    return Promise.all(promises);
  };

  await writeFiles("js", clientFolderPath);
  await writeFiles("ts", serverFolderPath);
  const duration = Date.now() - startTime;
  logger.info(`Wrote files in ${duration}ms`);
};

export default updateFiles;
