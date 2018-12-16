/* eslint-env mocha */
import { return_Selected_Words_With_Article } from "../../src/Functions/WordSelector_functions/ReturnSelectedWords.function";
import chai from "chai";
const assert = chai.assert;

suite("Return Selected words function", function() {
  test("unique form, no alternative, FR source language", function() {
    let result = return_Selected_Words_With_Article(
      "fr",
      [{ uniqueForm: "marcher" }],
      [{ uniqueForm: "to walk" }],
      ["uniqueForm"],
      "uniqueForm",
      ""
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one"
    );
    assert.equal(result.fr[0], "marcher", "FR result should be marcher");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.en,
      1,
      "EN response array should have a length of one"
    );
    assert.equal(result.en[0], "to walk", "EN result should be to walk");
  });

  test("unique form, no alternative, EN source language", function() {
    let result = return_Selected_Words_With_Article(
      "en",
      [{ uniqueForm: "marcher" }],
      [{ uniqueForm: "to walk" }],
      ["uniqueForm"],
      "uniqueForm",
      ""
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.en, "source language response should be an array");
    assert.lengthOf(
      result.en,
      1,
      "EN response array should have a length of one"
    );
    assert.equal(result.en[0], "to walk", "EN result should be to walk");
    assert.isArray(result.fr, "FR response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one"
    );
    assert.equal(result.fr[0], "marcher", "FR result should be marcher");
  });

  test("Unique form, 1 alternative, FR source language", function() {
    let result = return_Selected_Words_With_Article(
      "fr",
      [{ uniqueForm: "voyage" }],
      [{ uniqueForm: "journey" }, { uniqueForm: "travel" }],
      ["uniqueForm"],
      "uniqueForm",
      ""
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one"
    );
    assert.equal(result.fr[0], "voyage", "FR result should be 'marcher'");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.en,
      2,
      "EN response array should have a length of two"
    );
    assert.equal(result.en[0], "journey", "first EN result should be journey");
    assert.equal(result.en[1], "travel", "second EN result should be travel");
  });
});
