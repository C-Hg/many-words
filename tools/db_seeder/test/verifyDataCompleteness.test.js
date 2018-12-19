/* eslint-env mocha */
const {
  verifyDataCompleteness
} = require("../md_parser/functions/verifyDataCompleteness.function");
const chai = require("chai");
const assert = chai.assert;

suite("Verify data completeness function", function() {
  test("everything present", function() {
    let result = verifyDataCompleteness(
      "hello",
      "bonjour",
      "other",
      "présentations"
    );
    assert.isBoolean(result, "response should be a boolean");
    assert.isTrue(result, "response should be true");
  });

  test("no en_name", function() {
    let result = verifyDataCompleteness(
      "",
      "bonjour",
      "other",
      "présentations"
    );
    assert.isBoolean(result, "response should be a boolean");
    assert.isFalse(result, "response should be false, missing en_name");
  });
  test("no fr_name", function() {
    let result = verifyDataCompleteness("hello", "", "other", "présentations");
    assert.isBoolean(result, "response should be a boolean");
    assert.isFalse(result, "response should be false, missing fr_name");
  });
  test("no type", function() {
    let result = verifyDataCompleteness(
      "hello",
      "bonjour",
      "",
      "présentations"
    );
    assert.isBoolean(result, "response should be a boolean");
    assert.isFalse(result, "response should be false, missing type");
  });
  test("no lesson name", function() {
    let result = verifyDataCompleteness("hello", "bonjour", "other", "");
    assert.isBoolean(result, "response should be a boolean");
    assert.isFalse(result, "response should be false, missing lesson name");
  });
});
