/* eslint-env mocha */
import randomPicker  from "../../src/controllers/common/randomPicker.function";
import chai from "chai";
const assert = chai.assert;

suite("Random Picker function", function() {
  test("Selects FR or EN as a language", function() {
    let result = randomPicker(["fr", "en"]);
    assert.isString(result, "result should be a string");
    assert.match(result, /^fr$|^en$/, "fr or en should be picked ");
  });
  test("Selects infinite or indefinite as article type", function() {
    let result = randomPicker(["definite", "indefinite"]);
    assert.isString(result, "result should be a string");
    assert.match(
      result,
      /^definite$|^indefinite$/,
      "definite or indefinite should be picked"
    );
  });
});
