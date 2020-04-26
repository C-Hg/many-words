/* eslint-env mocha */
const path = require("path");
const {
  readMdFile
} = require("../markdown_fetching_functions/readMarkdownFile.function");
const {
  fetchFrWords
} = require("../markdown_parser/functions/fetchFrWords.function");
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

suite("Fetch FR words function", function() {
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
    let result = fetchFrWords(journey);
    assert.isFalse(result);
  });
  // 3rd and 4th columns are successfully ignored because there is no valid data in the 3rd

  test("mouse.md, valid first column", function() {
    let result = fetchFrWords(mouse);
    assert.isArray(result);
    assert.lengthOf(result, 1);
    assert(Object.keys(result[0]).length === 3);
    assert.propertyVal(result[0], "fem_sing", "souris");
    assert.propertyVal(result[0], "fem_plur", "souris");
  });

  test("apple.md, 'l' articles, 4 columns", function() {
    let result = fetchFrWords(apple);
    assert.isArray(result);
    assert.lengthOf(result, 4);
    assert(Object.keys(result[0]).length === 4);
    assert.propertyVal(result[0], "masc_sing", "âne");
    assert.propertyVal(result[0], "masc_plur", "ânes");

    assert(Object.keys(result[1]).length === 3);
    assert.propertyVal(result[1], "masc_sing", "singe");
    assert.propertyVal(result[1], "masc_plur", "singes");

    assert(Object.keys(result[2]).length === 3);
    assert.propertyVal(result[2], "masc_sing", "lion");
    assert.propertyVal(result[2], "masc_plur", "lions");

    assert(Object.keys(result[3]).length === 4);
    assert.propertyVal(result[3], "masc_sing", "avion");
    assert.propertyVal(result[3], "masc_plur", "avions");
  });

  test("void.md, void table", function() {
    let result = fetchFrWords(voidTable);
    assert.isFalse(result);
  });

  //this one also accounts for words in several parts
  test("unique.md, 4 unique forms", function() {
    let result = fetchFrWords(unique);
    assert.isArray(result);
    assert.lengthOf(result, 4);

    assert(Object.keys(result[0]).length === 2);
    assert.propertyVal(result[0], "uniqueForm", "Bonjour");

    assert(Object.keys(result[1]).length === 2);
    assert.propertyVal(result[1], "uniqueForm", "à vous");

    assert(Object.keys(result[2]).length === 2);
    assert.propertyVal(result[2], "uniqueForm", "mes très chers");

    assert(Object.keys(result[3]).length === 2);
    assert.propertyVal(result[3], "uniqueForm", "amis");
  });
});
