/* eslint-env mocha */
import return_Selected_Words_With_Article from "../../src/controllers/exercise_fetcher/word_selector/returnSelectedWords.function";
import chai from "chai";
const assert = chai.assert;

suite("Return selected words with article function", function() {
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
  test("2 forms, no alternative, EN source language : sing form, definite", function() {
    let result = return_Selected_Words_With_Article(
      "en",
      [{ fem_sing: "vache", fem_plur: "vaches" }],
      [{ sing: "cow", plur: "cows" }],
      ["fem_sing", "masc_sing"],
      "sing",
      "definite"
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one"
    );
    assert.lengthOf(
      result.en,
      1,
      "EN response array should have a length of one"
    );
    assert.equal(result.fr[0], "la vache", "FR result should be 'la vache'");
    assert.equal(result.en[0], "the cow", "EN result should be 'the cow'");
  });
  test("2 forms, no alternative, FR source language : fem_plur form, indefinite", function() {
    let result = return_Selected_Words_With_Article(
      "en",
      [{ fem_sing: "vache", fem_plur: "vaches" }],
      [{ sing: "cow", plur: "cows" }],
      ["fem_plur"],
      "plur",
      "indefinite"
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one"
    );
    assert.lengthOf(
      result.en,
      1,
      "EN response array should have a length of one"
    );
    assert.equal(result.fr[0], "des vaches", "FR result should be 'la vache'");
    assert.equal(result.en[0], "cows", "EN result should be 'the cow'");
  });
  test("adjective, 1 alternative each, EN source language", function() {
    let result = return_Selected_Words_With_Article(
      "en",
      [
        {
          masc_sing: "beau",
          fem_sing: "belle",
          masc_plur: "beaux",
          fem_plur: "belles"
        },
        {
          masc_sing: "joli",
          fem_sing: "jolie",
          masc_plur: "jolis",
          fem_plur: "jolies"
        }
      ],
      [{ uniqueForm: "beautiful" }, { uniqueForm: "pretty" }],
      ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
      "uniqueForm",
      ""
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.fr,
      8,
      "FR response array should have a length of one (destination)"
    );
    assert.lengthOf(
      result.en,
      1,
      "EN response array should have a length of one (source)"
    );
    assert.equal(result.fr[0], "beau", "FR first possibility should be 'beau'");
    assert.equal(
      result.fr[2],
      "belle",
      "FR third possibility should be 'beaux'"
    );
    assert.equal(result.fr[4], "joli", "FR fifth possibility should be 'joli'");
    assert.equal(
      result.fr[5],
      "jolis",
      "FR sixth possibility should be 'jolis'"
    );
    assert.equal(
      result.fr[7],
      "jolies",
      "FR eigth possibility should be 'jolies'"
    );
  });
  test("adjective, 1 alternative each, FR source language, masc_plur", function() {
    let result = return_Selected_Words_With_Article(
      "fr",
      [
        {
          masc_sing: "beau",
          fem_sing: "belle",
          masc_plur: "beaux",
          fem_plur: "belles"
        },
        {
          masc_sing: "joli",
          fem_sing: "jolie",
          masc_plur: "jolis",
          fem_plur: "jolies"
        }
      ],
      [{ uniqueForm: "beautiful" }, { uniqueForm: "pretty" }],
      ["masc_plur"],
      "uniqueForm",
      ""
    );
    assert.isObject(result, "response should be an object");
    assert.isArray(result.fr, "FR response should be an array");
    assert.isArray(result.en, "EN response should be an array");
    assert.lengthOf(
      result.fr,
      1,
      "FR response array should have a length of one (source)"
    );
    assert.lengthOf(
      result.en,
      2,
      "EN response array should have a length of two (destination)"
    );
    assert.equal(result.fr[0], "beaux", "FR response should be 'beaux'");
    assert.equal(
      result.en[0],
      "beautiful",
      "EN first possibility should be 'beautiful'"
    );
    assert.equal(
      result.en[1],
      "pretty",
      "EN second possibility should be 'pretty'"
    );
  });
});
