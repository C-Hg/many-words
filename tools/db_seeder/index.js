const path = require("path");
const fs = require("fs");
const extractData = require("./md_parser/mdParser");

fs.readFile(
  "../../curriculum/FR-EN/Easy_lessons/Animals/cat.md",
  "utf8",
  function(err, data) {
    if (err) {
      return console.log(err);
    }
    let formattedData = extractData.extractData(data);
    console.log(formattedData);
  }
);
