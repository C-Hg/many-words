const path = require("path");
const fs = require("fs");
const extractData = require("./md_parser/mdParser");
const fileFunction = require("./getFiles");

const curriculumDirectory = path.resolve("../../curriculum/FR-EN/");
//returns an array of files
/*
fileFunction.walk(curriculumDirectory, function(err, data) {
  console.log(data);
});*/

async function gatherData() {
  let asyncData = await fileFunction.getFiles(curriculumDirectory);
  console.log(asyncData);
}

gatherData();
