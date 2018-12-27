/* eslint-env mocha */
const path = require("path");
const {
  gatherData
} = require("../markdown_fetching_functions/gatherData.function");
const chai = require("chai");
const assert = chai.assert;

const testRootDirectoryPath = path.resolve(
  process.cwd() + "/test/tested_Md_files"
);
const validTestDirectoryPath = path.resolve(
  process.cwd() + "/test/tested_Md_files/valid_files"
);

suite("Gather data function", function() {
  let testRoot, validTests;
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

    //apple.md
    assert(Object.keys(validTests[0]).length === 6);
    assert.propertyVal(validTests[0], "en_name", "apple");
    assert.propertyVal(validTests[0], "fr_name", "âne");
    assert.propertyVal(validTests[0], "lessonName", "valid_files");
    assert.propertyVal(validTests[0], "type", "noun");
    assert.deepEqual(validTests[0].fr, [
      {
        masc_sing: "âne",
        masc_plur: "ânes",
        isLApostrophe: true,
        acceptedForms: ["masc_sing", "masc_plur"]
      },
      {
        masc_sing: "singe",
        masc_plur: "singes",
        acceptedForms: ["masc_sing", "masc_plur"]
      },
      {
        masc_sing: "lion",
        masc_plur: "lions",
        acceptedForms: ["masc_sing", "masc_plur"]
      },
      {
        masc_sing: "avion",
        masc_plur: "avions",
        isLApostrophe: true,
        acceptedForms: ["masc_sing", "masc_plur"]
      }
    ]);
    assert.deepEqual(validTests[0].en, [
      {
        sing: "apple",
        plur: "apples",
        isArticleAn: true,
        acceptedForms: ["sing", "plur"]
      },
      {
        sing: "pear",
        plur: "pears",
        acceptedForms: ["sing", "plur"]
      },
      {
        sing: "banana",
        plur: "bananas",
        acceptedForms: ["sing", "plur"]
      },
      {
        sing: "orange",
        plur: "oranges",
        isArticleAn: true,
        acceptedForms: ["sing", "plur"]
      }
    ]);

    //uique.md
    assert(Object.keys(validTests[1]).length === 7);
    assert.propertyVal(validTests[1], "en_name", "hello");
    assert.propertyVal(validTests[1], "fr_name", "bonjour");
    assert.propertyVal(validTests[1], "lessonName", "subfolder_test");
    assert.propertyVal(validTests[1], "type", "other");
    assert.propertyVal(validTests[1], "hasUniqueForm", true);
    assert.deepEqual(validTests[1].fr, [
      { uniqueForm: "Bonjour", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "à vous", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "mes très chers", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "amis", acceptedForms: ["uniqueForm"] }
    ]);
    assert.deepEqual(validTests[1].en, [
      { uniqueForm: "hello you", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "my", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "dear", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "and greatest friend", acceptedForms: ["uniqueForm"] }
    ]);
  });
});
