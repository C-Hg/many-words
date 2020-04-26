/* eslint-env mocha */
const path = require("path");
const {
  gatherData
} = require("../markdown_fetching_functions/gatherData.function");
const chai = require("chai");

const assert = chai.assert;

const testRootDirectoryPath = path.resolve(
  `${process.cwd()  }/test/tested_Md_files`
);
const validTestDirectoryPath = path.resolve(
  `${process.cwd()  }/test/tested_Md_files/valid_files`
);

suite("Gather data function", function() {
  let testRoot; let validTests;
  before(() => {
    return new Promise(async (resolve, reject) => {
      testRoot = await gatherData(testRootDirectoryPath);
      validTests = await gatherData(validTestDirectoryPath);
      resolve();
    });
  });

  test("from test directory root", function() {
    assert.isFalse(testRoot);
  });

  test("from directory with only valid files", function() {
    assert.isArray(validTests);
    assert.lengthOf(validTests, 2);

    // apple.md
    assert(Object.keys(validTests[0]).length === 7);
    assert.propertyVal(validTests[0], "enName", "apple");
    assert.propertyVal(validTests[0], "frName", "âne");
    assert.propertyVal(validTests[0], "lesson", "valid_files");
    assert.propertyVal(validTests[0], "type", "noun");
    assert.deepEqual(validTests[0].fr, [
      {
        masc_sing: "âne",
        masc_plur: "ânes",
      },
      {
        masc_sing: "singe",
        masc_plur: "singes",
      },
      {
        masc_sing: "lion",
        masc_plur: "lions",
      },
      {
        masc_sing: "avion",
        masc_plur: "avions",
      }
    ]);
    assert.deepEqual(validTests[0].en, [
      {
        sing: "apple",
        plur: "apples",
      },
      {
        sing: "pear",
        plur: "pears",
      },
      {
        sing: "banana",
        plur: "bananas",
      },
      {
        sing: "orange",
        plur: "oranges",
      }
    ]);

    // uique.md
    assert(Object.keys(validTests[1]).length === 8);
    assert.propertyVal(validTests[1], "enName", "hello");
    assert.propertyVal(validTests[1], "frName", "bonjour");
    assert.propertyVal(validTests[1], "lesson", "subfolder_test");
    assert.propertyVal(validTests[1], "type", "other");
    assert.deepEqual(validTests[1].fr, [
      { uniqueForm: "Bonjour" },
      { uniqueForm: "à vous" },
      { uniqueForm: "mes très chers" },
      { uniqueForm: "amis de l'île" }
    ]);
    assert.deepEqual(validTests[1].en, [
      { uniqueForm: "hello you" },
      { uniqueForm: "my" },
      { uniqueForm: "dear" },
      { uniqueForm: "and greatest friend" }
    ]);
  });
});
