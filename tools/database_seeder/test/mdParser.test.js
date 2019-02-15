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
  "./test/tested_Md_files/testing_subfolder_search/in_depth/no_fr_name.md"
);
const noEnNamePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/in_depth/no_en_name.md"
);

suite("Extract data function", function() {
  let journey, mouse, apple, voidTable, unique, noType, noFrName, noEnName;
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
    let result = extractData(journey);
    assert.isFalse(result);
  });

  test("mouse.md, valid noun, ignored last columns", function() {
    let result = extractData(mouse, ["testing_subfolder_search", "theme"]);
    console.log(result);
    assert.isObject(result);
    assert(Object.keys(result).length === 7);
    assert.propertyVal(result, "en_name", "mouse");
    assert.propertyVal(result, "fr_name", "souris");
    assert.propertyVal(result, "lesson", "testing_subfolder_search");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "noun");
    assert.propertyVal(result.fr[0], "fem_sing", "souris");
    assert.propertyVal(result.fr[0], "fem_plur", "souris");
    assert.deepEqual(result.fr[0].acceptedForms, ["fem_sing", "fem_plur"]);
    assert.deepEqual(result.en[0], {
      sing: "mouse",
      plur: "mice",
      acceptedForms: ["sing", "plur"]
    });
  });

  test("apple.md, noun with 3 alternatives", function() {
    let result = extractData(apple, ["in_depth", "theme"]);
    assert.isObject(result);
    assert(Object.keys(result).length === 7);
    assert.propertyVal(result, "en_name", "apple");
    assert.propertyVal(result, "fr_name", "âne");
    assert.propertyVal(result, "lesson", "in_depth");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "noun");
    assert.deepEqual(result.fr, [
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
    assert.deepEqual(result.en, [
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
  });

  test("void.md, void table error", function() {
    let result = extractData(voidTable, "tested_Md_files");
    assert.isFalse(result);
  });

  test("no_type.md, no type found error", function() {
    let result = extractData(noType, "in_depth");
    assert.isFalse(result);
  });

  test("no_fr_name.md, no fr_name found error", function() {
    let result = extractData(noFrName, "in_depth");
    assert.isFalse(result);
  });

  test("no_en_name.md, no en_name found error", function() {
    let result = extractData(noEnName, "in_depth");
    assert.isFalse(result);
  });

  test("unique.md, valid unique forms", function() {
    let result = extractData(unique, ["tested_Md_files", "theme"]);
    assert.isObject(result);
    assert(Object.keys(result).length === 8);
    assert.propertyVal(result, "en_name", "hello");
    assert.propertyVal(result, "fr_name", "bonjour");
    assert.propertyVal(result, "lesson", "tested_Md_files");
    assert.propertyVal(result, "theme", "theme");
    assert.propertyVal(result, "type", "other");
    assert.propertyVal(result, "hasUniqueForm", true);
    assert.deepEqual(result.fr, [
      { uniqueForm: "Bonjour", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "à vous", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "mes très chers", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "amis", acceptedForms: ["uniqueForm"] }
    ]);
    assert.deepEqual(result.en, [
      { uniqueForm: "hello you", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "my", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "dear", acceptedForms: ["uniqueForm"] },
      { uniqueForm: "and greatest friend", acceptedForms: ["uniqueForm"] }
    ]);
  });
});
