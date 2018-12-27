/* eslint-env mocha */
const { readMdFile } = require("../main_functions/readMdFile.function");
const {
  checkEnAlternative
} = require("../md_parser/functions/checkEnAlternative.function");
const path = require("path");
const chai = require("chai");
const assert = chai.assert;

// these tests aim to evaluate the correct extraction of the data from the markdown EN table
// they rely on the test file journey.md
// QA of the collected data is done by checkEnFormat function
const testFilePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/journey.md"
);

suite("Check EN Alternative function", function() {
  let mdData;
  before(() => {
    return new Promise(async (resolve, reject) => {
      mdData = await readMdFile(testFilePath);
      resolve();
    });
  });

  test("Main column", function() {
    let result = checkEnAlternative("Main", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(
      result,
      "sing",
      "journey",
      "sing property should be journey"
    );
    assert.propertyVal(
      result,
      "plur",
      "journeys",
      "plur property should be journeys"
    );
    assert.propertyVal(
      result,
      "uniqueForm",
      "world",
      "uniqueForm property should be world"
    );
    assert.propertyVal(
      result,
      "isArticleAn",
      true,
      "isArticleAn property should be true"
    );
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 3);
    assert.includeMembers(result.acceptedForms, ["sing", "plur", "uniqueForm"]);
    assert(Object.keys(result).length === 5);
  });

  test("Alt 1 column", function() {
    let result = checkEnAlternative("Alt1", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(result, "sing", "to travel far away");
    assert.propertyVal(result, "plur", "travels");
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 2);
    assert.includeMembers(result.acceptedForms, ["sing", "plur"]);
    assert(Object.keys(result).length === 3);
  });

  test("Alt 2 column", function() {
    let result = checkEnAlternative("Alt2", mdData);
    assert.isFalse(result);
  });

  test("Alt 3 column", function() {
    let result = checkEnAlternative("Alt3", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(result, "sing", "hello");
    assert.propertyVal(result, "uniqueForm", "world");
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 2);
    assert.includeMembers(result.acceptedForms, ["sing", "uniqueForm"]);
    assert(Object.keys(result).length === 4);
  });
});
