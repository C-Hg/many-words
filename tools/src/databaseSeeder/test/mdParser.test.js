/* eslint-env mocha */
const { extractData } = require("../markdown_parser/markdownParser");
const {
  readMdFile
} = require("../markdown_fetching_functions/readMarkdownFile.function");
const path = require("path");
const chai = require("chai");

const assert = chai.assert;

const journeyPath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/journey.md"
);
const mousePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/mouse.md"
);
const applePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/in_depth/apple.md"
);
const voidPath = path.resolve("./test/tested_Md_files/void.md");
const uniquePath = path.resolve("./test/tested_Md_files/unique.md");
const noTypePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/in_depth/no_type.md"
);
const noFrNamePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/in_depth/no_frName.md"
);
const noEnNamePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/in_depth/no_enName.md"
);

suite("Extract data function", function() {
  let journey; let mouse; let apple; let voidTable; let unique; let noType; let noFrName; let noEnName;
  before(() => {
    return new Promise(async (resolve, reject) => {
      journey = await readMdFile(journeyPath);
      mouse = await readMdFile(mousePath);
      apple = await readMdFile(applePath);
      voidTable = await readMdFile(voidPath);
      unique = await readMdFile(uniquePath);
      noType = await readMdFile(noTypePath);
      noFrName = await readMdFile(noFrNamePath);
      noEnName = await readMdFile(noEnNamePath);
      resolve();
    });
  });

  test("journey.md, error in tables", function() {
    const result = extractData(journey);
    assert.isFalse(result);
  });

  test("mouse.md, valid noun, ignored last columns", function() {
    const result = extractData(mouse, ["testing_subfolder_search", "theme"]);
    console.log(result);
    assert.isObject(result);
    assert(Object.keys(result).length === 7);
    assert.propertyVal(result, "enName", "mouse");
    assert.propertyVal(result, "frName", "souris");
    assert.propertyVal(result, "lesson", "testing_subfolder_search");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "noun");
    assert.propertyVal(result.fr[0], "fem_sing", "souris");
    assert.propertyVal(result.fr[0], "fem_plur", "souris");
    assert.deepEqual(result.en[0], {
      sing: "mouse",
      plur: "mice",
    });
  });

  test("apple.md, noun with 3 alternatives", function() {
    const result = extractData(apple, ["in_depth", "theme"]);
    assert.isObject(result);
    assert(Object.keys(result).length === 7);
    assert.propertyVal(result, "enName", "apple");
    assert.propertyVal(result, "frName", "âne");
    assert.propertyVal(result, "lesson", "in_depth");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "noun");
    assert.deepEqual(result.fr, [
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
    assert.deepEqual(result.en, [
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
  });

  test("void.md, void table error", function() {
    const result = extractData(voidTable, "tested_Md_files");
    assert.isFalse(result);
  });

  test("no_type.md, no type found error", function() {
    const result = extractData(noType, "in_depth");
    assert.isFalse(result);
  });

  test("no_frName.md, no frName found error", function() {
    const result = extractData(noFrName, "in_depth");
    assert.isFalse(result);
  });

  test("no_enName.md, no enName found error", function() {
    const result = extractData(noEnName, "in_depth");
    assert.isFalse(result);
  });

  test("unique.md, valid unique forms", function() {
    const result = extractData(unique, ["tested_Md_files", "theme"]);
    assert.isObject(result);
    assert(Object.keys(result).length === 8);
    assert.propertyVal(result, "enName", "hello");
    assert.propertyVal(result, "frName", "bonjour");
    assert.propertyVal(result, "lesson", "tested_Md_files");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "other");
    assert.deepEqual(result.fr, [
      { uniqueForm: "Bonjour" },
      { uniqueForm: "à vous" },
      { uniqueForm: "mes très chers" },
      { uniqueForm: "amis" }
    ]);
    assert.deepEqual(result.en, [
      { uniqueForm: "hello you" },
      { uniqueForm: "my" },
      { uniqueForm: "dear" },
      { uniqueForm: "and greatest friend" }
    ]);
  });
});
