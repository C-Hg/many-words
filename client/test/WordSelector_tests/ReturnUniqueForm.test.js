/* eslint-env mocha */
import returnUniqueForm from "../../src/Functions/WordSelector_functions/ReturnUniqueForm.function";
import chai from "chai";
const assert = chai.assert;

suite("Return Unique Form function", function() {
  test("no alternative, fr source language", function() {
    let result = returnUniqueForm.returnUniqueForm(
      "fr",
      [{ uniqueForm: "marcher" }],
      [{ uniqueForm: "to walk" }]
    );
    assert.isObject(result, "response should be an object");
    assert.isString(result.fr, "source language response should be a string");
    assert.propertyVal(result, "fr", "marcher", "fr result should be marcher");
    assert.isArray(
      result.en,
      "destination language response should be an array"
    );
    assert.lengthOf(
      result.en,
      1,
      "destination language array should have a length of one"
    );
    assert.equal(result.en[0], "to walk", "en result should be to walk");
  });

  test("no alternative, en source language", function() {
    let result = returnUniqueForm.returnUniqueForm(
      "fr",
      [{ uniqueForm: "marcher" }],
      [{ uniqueForm: "to walk" }]
    );
    assert.isObject(result, "response should be an object");
    assert.isString(result.en, "source language response should be a string");
    assert.propertyVal(result, "en", "to walk", "en result should be marcher");
    assert.isArray(
      result.fr,
      "destination language response should be an array"
    );
    assert.lengthOf(
      result.fr,
      1,
      "destination language array should have a length of one"
    );
    assert.equal(result.fr[0], "marcher", "fr result should be marcher");
  });

  test("Unique form, 1 alternative, fr source language", function() {
    let result = returnUniqueForm.returnUniqueForm(
      "fr",
      [{ uniqueForm: "voyage" }],
      [{ uniqueForm: "journey" }, { uniqueForm: "travel" }]
    );
    assert.isObject(result, "response should be an object");
    assert.isString(result.fr, "source language response should be a string");
    assert.propertyVal(result, "fr", "voyage", "fr result should be marcher");
    assert.isArray(
      result.en,
      "destination language response should be an array"
    );
    assert.lengthOf(
      result.en,
      2,
      "destination language array should have a length of two"
    );
    assert.equal(result.en[0], "journey", "first en result should be journey");
    assert.equal(result.en[1], "travel", "second en result should be travel");
  });
});
