/* eslint-env mocha */
import { returnForms } from "../../src/controllers/exercise_fetcher/word_selector/returnForms.function";
import chai from "chai";
const assert = chai.assert;

suite("Return Forms function", function() {
  test("masc_sing noun", function() {
    let result = returnForms("masc_sing", "noun", "fr");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.en, "sing");
  });
  test("masc_plur noun", function() {
    let result = returnForms("masc_plur", "noun", "fr");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_plur");
    assert.equal(result.en, "plur");
  });
  test("fem_sing noun", function() {
    let result = returnForms("fem_sing", "noun", "fr");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "fem_sing");
    assert.equal(result.en, "sing");
  });
  test("fem_plur noun", function() {
    let result = returnForms("fem_plur", "noun", "fr");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "fem_plur");
    assert.equal(result.en, "plur");
  });
  test("sing noun", function() {
    let result = returnForms("sing", "noun", "en");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 2, "array length should be two");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.fr[1], "fem_sing");
    assert.equal(result.en, "sing");
  });
  test("plur noun", function() {
    let result = returnForms("plur", "noun", "en");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 2, "array length should be two");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_plur");
    assert.equal(result.fr[1], "fem_plur");
    assert.equal(result.en, "plur");
  });
  test("adjective source language FR", function() {
    let result = returnForms("masc_sing", "adjective", "fr");
    assert.isArray(result.fr, "FR forms is always an array");
    assert.lengthOf(result.fr, 1, "FR array length should be one (source)");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.en, "uniqueForm");
  });
  test("adjective source language EN", function() {
    let result = returnForms("uniqueForm", "adjective", "en");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(
      result.fr,
      4,
      "FR array length should be four (destination)"
    );
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.fr[1], "masc_plur");
    assert.equal(result.fr[2], "fem_sing");
    assert.equal(result.fr[3], "fem_plur");
    assert.equal(result.en, "uniqueForm");
  });
});
