const fs = require("fs");

module.exports = async function updateFiles(
  lessons,
  themes,
  wordCountByLesson
) {
  // destination directories
  const directories = [
    "../server/exercises/FR-EN/",
    "../client/src/exercises/"
  ];

  const data = {
    lessons: lessons,
    themes: themes,
    wordCountByLesson: wordCountByLesson
  };

  // write the 3 files necessary to the client and server
  for (let entry in data) {
    let buffer = Buffer.from(
      "module.exports = " + JSON.stringify(data[entry]) + ";"
    );
    fs.writeFile(entry.toString() + ".js", buffer, err => {
      if (err) throw err;
      console.log(entry.toString() + ".js has been saved!");
      // then copies them in the appropriate directories
      for (let destination in directories) {
        fs.copyFile(
          entry.toString() + ".js",
          directories[destination] + entry.toString() + ".js",
          err => {
            if (err) throw err;
            console.log(
              entry.toString() +
                ".js was copied to " +
                directories[destination] +
                entry.toString() +
                ".js"
            );
          }
        );
      }
    });
  }
};
