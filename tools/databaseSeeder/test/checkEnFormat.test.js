/* eslint-env mocha */
const {
  checkEnFormat
} = require("../markdown_parser/functions/checkEnFormat.function");
const chai = require("chai");
const assert = chai.assert;

suite("Check EN format function", function() {
  test("valid unique form", function() {
    let result = checkEnFormat({
      uniqueForm: "world",
      acceptedForms: ["uniqueForm"]
    });
    assert.isBoolean(result, "response should be a boolean");
    assert.isTrue(result);
  });
  test("valid sing and plur forms", function() {
    let result = checkEnFormat({
      sing: "apple",
      plur: "apples",
      acceptedForms: ["sing", "plur"]
    });
    assert.isTrue(result);
  });
  test("no acceptedForms property, unique form", function() {
    let result = checkEnFormat({
      uniqueForm: "world"
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching plur form", function() {
    let result = checkEnFormat({
      sing: "apple",
      plur: "apples",
      acceptedForms: ["sing"]
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching sing form", function() {
    let result = checkEnFormat({
      sing: "apple",
      plur: "apples",
      acceptedForms: ["plur"]
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching sing/plur names", function() {
    let result = checkEnFormat({
      sing: "apple",
      plur: "apples",
      acceptedForms: ["plurs", "sing"]
    });
    assert.isFalse(result);
  });
  test("acceptedForms property not matching uniqueForm", function() {
    let result = checkEnFormat({
      uniqueForm: "apple",
      acceptedForms: ["plur"]
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with sing", function() {
    let result = checkEnFormat({
      sing: "apple",
      uniqueForm: "pie",
      acceptedForms: ["sing", "uniqueForm"]
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with plur", function() {
    let result = checkEnFormat({
      plur: "apples",
      uniqueForm: "pie",
      acceptedForms: ["plur", "uniqueForm"]
    });
    assert.isFalse(result);
  });
  test("cumulating uniqueForm with plur and sing", function() {
    let result = checkEnFormat({
      sing: "apple",
      plur: "apples",
      uniqueForm: "pie",
      acceptedForms: ["sing", "plur", "uniqueForm"]
    });
    assert.isFalse(result);
  });
  test("void sing properties", function() {
    let result = checkEnFormat({
      sing: "",
      plur: "apples",

      acceptedForms: ["plur", "sing"]
    });
    assert.isFalse(result);
  });
  test("void uniqueForm properties", function() {
    let result = checkEnFormat({
      uniqueForm: "",
      acceptedForms: ["uniqueForm"]
    });
    assert.isFalse(result);
  });
});
