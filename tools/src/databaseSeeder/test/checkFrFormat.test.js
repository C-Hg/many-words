/* eslint-env mocha */
const {
  checkFrFormat
} = require("../markdown_parser/functions/checkFrFormat.function");
const chai = require("chai");
const assert = chai.assert;

suite("Check FR format function", function() {
  test("valid unique form", function() {
    let result = checkFrFormat({
      uniqueForm: "world",
    });
    assert.isBoolean(result, "response should be a boolean");
    assert.isTrue(result);
  });
  test("valid fem_sing and fem_plur forms", function() {
    let result = checkFrFormat({
      fem_sing: "pomme",
      fem_plur: "pommes",
    });
    assert.isTrue(result);
  });
  test("valid masc_sing and masc_plur forms", function() {
    let result = checkFrFormat({
      masc_sing: "pomme",
      masc_plur: "pommes",
    });
    assert.isTrue(result);
  });
  test("4 valid forms", function() {
    let result = checkFrFormat({
      masc_sing: "pomme",
      masc_plur: "pommes",
      fem_sing: "pomme",
      fem_plur: "pommes",
    });
    assert.isTrue(result);
  });
  test("no acceptedForms property, unique form", function() {
    let result = checkFrFormat({
      uniqueForm: "world"
    });
    assert.isFalse(result);
  });
  test("void acceptedForms property, unique form", function() {
    let result = checkFrFormat({
      uniqueForm: "world",
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching plur form", function() {
    let result = checkFrFormat({
      fem_sing: "apple",
      fem_plur: "apples",
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching sing form", function() {
    let result = checkFrFormat({
      fem_sing: "apple",
      fem_plur: "apples",
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching sing/plur names", function() {
    let result = checkFrFormat({
      masc_sing: "apple",
      masc_plur: "apples",
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching uniqueForm", function() {
    let result = checkFrFormat({
      uniqueForm: "apple",
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with sing", function() {
    let result = checkFrFormat({
      masc_sing: "apple",
      uniqueForm: "pie",
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with plur", function() {
    let result = checkFrFormat({
      fem_plur: "apples",
      uniqueForm: "pie",
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with plur and sing", function() {
    let result = checkFrFormat({
      fem_sing: "apple",
      fem_plur: "apples",
      uniqueForm: "pie",
    });
    assert.isFalse(result);
  });
  test("void sing properties", function() {
    let result = checkFrFormat({
      masc_sing: "",
      masc_plur: "apples",
    });
    assert.isFalse(result);
  });
  test("void uniqueForm properties", function() {
    let result = checkFrFormat({
      uniqueForm: "",
    });
    assert.isFalse(result);
  });
});
