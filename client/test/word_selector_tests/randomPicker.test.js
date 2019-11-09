/* eslint-disable func-names */
/* eslint-env mocha */
import chai from "chai";
import randomPicker from "../../src/services/randomPicker.function";

const { assert } = chai;

suite("Random Picker function", function() {
  test("Selects FR or EN as a language", function() {
    const result = randomPicker(["fr", "en"]);
    assert.isString(result, "result should be a string");
    assert.match(result, /^fr$|^en$/, "fr or en should be picked ");
  });
  test("Selects infinite or indefinite as article type", function() {
    const result = randomPicker(["definite", "indefinite"]);
    assert.isString(result, "result should be a string");
    assert.match(
      result,
      /^definite$|^indefinite$/,
      "definite or indefinite should be picked"
    );
  });
});
