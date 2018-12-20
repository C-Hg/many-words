/* eslint-env mocha */
const { readMdFile } = require("../readMdFile");
const {
  checkFrAlternative
} = require("../md_parser/functions/checkFrAlternative.function");
const path = require("path");
const chai = require("chai");
const assert = chai.assert;

// these tests aim to evaluate the correct extraction of the data from the markdown EN table
// they rely on the test file journey.md
// QA of the collected data is done by checkEnFormat function
const testFilePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/journey.md"
);

suite("Check FR Alternative function", function() {
  let mdData;
  before(() => {
    return new Promise(async (resolve, reject) => {
      mdData = await readMdFile(testFilePath);
      resolve();
    });
  });

  test("Main column", function() {
    let result = checkFrAlternative("Main", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(
      result,
      "masc_sing",
      "voyage",
      "sing property should be journey"
    );
    assert.propertyVal(result, "masc_plur", "voyages");
    assert.propertyVal(result, "fem_sing", "fleur");
    assert.propertyVal(result, "fem_plur", "fleurs");
    assert.propertyVal(result, "uniqueForm", "voyageons");
    assert.notProperty(result, "isLApostrophe");
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 5);
    assert.includeMembers(result.acceptedForms, [
      "masc_sing",
      "masc_plur",
      "fem_sing",
      "fem_plur",
      "uniqueForm"
    ]);
    assert(Object.keys(result).length === 6);
  });

  test("Alt 1 column", function() {
    let result = checkFrAlternative("Alt1", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(result, "masc_sing", "voyageurs");
    assert.propertyVal(result, "masc_plur", "voyageuses");
    assert.propertyVal(result, "fem_sing", "course à pied");
    assert.propertyVal(result, "uniqueForm", "monde");
    assert.notProperty(result, "isLApostrophe");
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 4);
    assert.includeMembers(result.acceptedForms, [
      "masc_sing",
      "masc_plur",
      "fem_sing",
      "uniqueForm"
    ]);
    assert(Object.keys(result).length === 5);
  });

  test("Alt 2 column", function() {
    let result = checkFrAlternative("Alt2", mdData);
    assert.isFalse(result);
  });

  test("Alt 3 column", function() {
    let result = checkFrAlternative("Alt3", mdData);
    assert.isObject(result, "response should be an object");
    assert.propertyVal(result, "masc_sing", "canoë après-midi");
    assert.propertyVal(result, "masc_plur", "Ânes");
    assert.propertyVal(result, "fem_sing", "Belle-Pensée");
    assert.propertyVal(result, "fem_plur", "îles");
    assert.propertyVal(result, "uniqueForm", "mondes");
    assert.propertyVal(result, "isLApostrophe", true);
    assert.isArray(result.acceptedForms);
    assert.lengthOf(result.acceptedForms, 5);
    assert.includeMembers(result.acceptedForms, [
      "masc_sing",
      "masc_plur",
      "fem_sing",
      "fem_plur",
      "uniqueForm"
    ]);
    assert(Object.keys(result).length === 7);
  });
});
