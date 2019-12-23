const fs = require("fs");

module.exports = async function updateFiles(
  lessonsByThemes,
  themes,
  wordCountByLesson
) {
  // destination directories
  const directories = [
    "../server/exercises/FR-EN/",
    "../client/src/exercises/",
  ];

  const data = {
    lessonsByThemes,
    themes,
    wordCountByLesson,
  };

  // write the 3 files necessary to the client and server
  for (const entry in data) {
    const buffer = Buffer.from(
      `export default ${JSON.stringify(data[entry])};`
    );
    fs.writeFile(`${entry.toString()}.js`, buffer, err => {
      if (err) throw err;
      console.log(`${entry.toString()}.js has been saved!`);
      // then copies them in the appropriate directories
      for (const destination in directories) {
        fs.copyFile(
          `${entry.toString()}.js`,
          `${directories[destination] + entry.toString()}.js`,
          err => {
            if (err) throw err;
            console.log(
              `${entry.toString()}.js was copied to ${
                directories[destination]
              }${entry.toString()}.js`
            );
          }
        );
      }
    });
  }
};
