/* eslint-env mocha */
const path = require("path");
const {
  readMdFile
} = require("../markdown_fetching_functions/readMarkdownFile.function");
const {
  fetchEnWords
} = require("../markdown_parser/functions/fetchEnWords.function");
const chai = require("chai");
const assert = chai.assert;

// these tests aim to evaluate the correct extraction AND validatation
// of the data from the markdown EN table
// they rely on the test files in tested_Md_files folder

const journeyPath = path.resolve(
  process.cwd() + "/test/tested_Md_files/testing_subfolder_search/journey.md"
);
const mousePath = path.resolve(
  process.cwd() + "/test/tested_Md_files/testing_subfolder_search/mouse.md"
);
const applePath = path.resolve(
  process.cwd() +
    "/test/tested_Md_files/testing_subfolder_search/in_depth/apple.md"
);
const voidPath = path.resolve(process.cwd() + "/test/tested_Md_files/void.md");
const uniquePath = path.resolve(
  process.cwd() + "/test/tested_Md_files/unique.md"
);

suite("Fetch EN words function", function() {
  let journey, mouse, apple, voidTable, unique;
  before(() => {
    return new Promise(async (resolve, reject) => {
      journey = await readMdFile(journeyPath);
      mouse = await readMdFile(mousePath);
      apple = await readMdFile(applePath);
      voidTable = await readMdFile(voidPath);
      unique = await readMdFile(uniquePath);
      resolve();
    });
  });

  test("journey.md, invalid first column", function() {
    let result = fetchEnWords(journey);
    assert.isFalse(result);
  });
  // 3rd and 4th columns are successfully ignored because there is no valid data in the 3rd

  test("mouse.md, valid first column", function() {
    let result = fetchEnWords(mouse);
    assert.isArray(result);
    assert.lengthOf(result, 1);
    assert(Object.keys(result[0]).length === 3);
    assert.propertyVal(result[0], "sing", "mouse");
    assert.propertyVal(result[0], "plur", "mice");
  });

  test("apple.md, 'an' article, 4 columns", function() {
    let result = fetchEnWords(apple);
    assert.isArray(result);
    assert.lengthOf(result, 4);
    assert(Object.keys(result[0]).length === 4);
    assert.lengthOf(result[0].acceptedForms, 2);
    assert.propertyVal(result[0], "sing", "apple");
    assert.propertyVal(result[0], "plur", "apples");

    assert(Object.keys(result[1]).length === 3);
    assert.lengthOf(result[1].acceptedForms, 2);
    assert.propertyVal(result[1], "sing", "pear");
    assert.propertyVal(result[1], "plur", "pears");


    assert(Object.keys(result[2]).length === 3);
    assert.lengthOf(result[2].acceptedForms, 2);
    assert.propertyVal(result[2], "sing", "banana");
    assert.propertyVal(result[2], "plur", "bananas");

    assert(Object.keys(result[3]).length === 4);
    assert.lengthOf(result[3].acceptedForms, 2);
    assert.propertyVal(result[3], "sing", "orange");
    assert.propertyVal(result[3], "plur", "oranges");
  });

  test("void.md, void table", function() {
    let result = fetchEnWords(voidTable);
    assert.isFalse(result);
  });

  //this one also accounts for words in several parts
  test("unique.md, 4 unique forms", function() {
    let result = fetchEnWords(unique);
    assert.isArray(result);
    assert.lengthOf(result, 4);

    assert(Object.keys(result[0]).length === 2);
    assert.lengthOf(result[0].acceptedForms, 1);
    assert.propertyVal(result[0], "uniqueForm", "hello you");

    assert(Object.keys(result[1]).length === 2);
    assert.lengthOf(result[1].acceptedForms, 1);
    assert.propertyVal(result[1], "uniqueForm", "my");

    assert(Object.keys(result[2]).length === 2);
    assert.lengthOf(result[2].acceptedForms, 1);
    assert.propertyVal(result[2], "uniqueForm", "dear");

    assert(Object.keys(result[3]).length === 2);
    assert.lengthOf(result[3].acceptedForms, 1);
    assert.propertyVal(result[3], "uniqueForm", "and greatest friend");
  });
});
