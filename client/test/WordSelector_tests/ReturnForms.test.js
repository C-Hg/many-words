/* eslint-env mocha */
import { returnForms } from "../../src/Functions/WordSelector_functions/ReturnForms.function";
import chai from "chai";
const assert = chai.assert;

suite("Return Forms function", function() {
  test("masc_sing", function() {
    let result = returnForms("masc_sing");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.en, "sing");
  });
  test("masc_plur", function() {
    let result = returnForms("masc_plur");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_plur");
    assert.equal(result.en, "plur");
  });
  test("fem_sing", function() {
    let result = returnForms("fem_sing");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "fem_sing");
    assert.equal(result.en, "sing");
  });
  test("fem_plur", function() {
    let result = returnForms("fem_plur");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 1, "array length should be one");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "fem_plur");
    assert.equal(result.en, "plur");
  });
  test("sing", function() {
    let result = returnForms("sing");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 2, "array length should be two");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_sing");
    assert.equal(result.fr[1], "fem_sing");
    assert.equal(result.en, "sing");
  });
  test("plur", function() {
    let result = returnForms("plur");
    assert.isArray(result.fr, "fr forms is always an array");
    assert.lengthOf(result.fr, 2, "array length should be two");
    assert.isString(result.en, "en forms is always a string");
    assert.equal(result.fr[0], "masc_plur");
    assert.equal(result.fr[1], "fem_plur");
    assert.equal(result.en, "plur");
  });
});
