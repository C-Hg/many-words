/* eslint-env mocha */

const functions = require("../src/Functions/Exercise_functions/WordSelector.functions");
const chai = require("chai");
const assert = chai.assert;

suite("Word Filter function", function() {
  test("Unique form with no article", function() {
    let result = functions.wordSelector([
      {
        languages: ["fr", "en"],
        en_name: "walk",
        fr_name: "marcher",
        hasArticle: false,
        hasUniqueForm: true,
        type: "verb",
        fr: [
          {
            uniqueForm: "marcher"
          }
        ],
        en: [
          {
            uniqueForm: "to walk"
          }
        ],
        lessonId: "#aLongId"
      }
    ]);
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 1, "the result array length should be one");
    assert.propertyVal(
      result[0],
      "sourceLanguage",
      "fr" || "en",
      "sourceLanguage should be fr or en"
    );
    if (result[0].sourceLanguage === "fr") {
      assert.propertyVal(result[0], "fr", "marcher");
      assert.isArray(
        result[0].en,
        "the destination language response should be inside an array"
      );
      assert.lengthOf(
        result[0].en,
        1,
        "the destination language array should have a length of one"
      );
      assert.equal(
        result[0].en[0],
        "walk",
        "the destination language translation should be 'walk'"
      );
    } else {
      assert.propertyVal(result[0], "en", "walk");
      assert.isArray(
        result[0].fr,
        "the destination language response should be inside an array"
      );
      assert.lengthOf(
        result[0].fr,
        1,
        "the destination language array should have a length of one"
      );
      assert.equal(
        result[0].en[0],
        "marcher",
        "the destination language translation should be 'marcher'"
      );
    }
  });

  test("Noun with 4 forms with article, no alternative", function() {
    let result = functions.wordSelector([
      {
        languages: ["fr", "en"],
        en_name: "cat",
        fr_name: "chat",
        hasArticle: true,
        hasUniqueForm: false,
        fr: [
          {
            acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
            masc_sing: "chat",
            masc_plur: "chats",
            fem_sing: "chatte",
            fem_plur: "chattes",
            isLApostrophe: false
          }
        ],
        en: [
          {
            acceptedForms: ["sing", "plur"],
            sing: "cat",
            plur: "cats",
            isArticleAn: false
          }
        ]
      }
    ]);
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 1, "the result array length should be one");
    assert.propertyVal(
      result[0],
      "sourceLanguage",
      "fr" || "en",
      "sourceLanguage should be fr or en"
    );
    if (result[0].sourceLanguage === "fr") {
      assert.isArray(
        result[0].en,
        "the destination language response should be inside an array"
      );
      assert.lengthOf(
        result[0].en,
        1,
        "the destination language array should have a length of one"
      );
      assert.equal(
        result[0].fr,
        "un chat" ||
          "une chatte" ||
          "le chat" ||
          "la chatte" ||
          "les chats" ||
          "les chattes" ||
          "des chats" ||
          "des chattes",
        "if fr is the source language, a correct word should be selected"
      );

      if (result[0].fr === "un chat" || "une chatte") {
        assert.equal(
          result[0].en[0],
          "a cat",
          "a cat should be the translation"
        );
      }
      if (result[0].fr === "le chat" || "la chatte") {
        assert.equal(
          result[0].en[0],
          "the cat",
          "the cat should be the translation"
        );
      }
      if (result[0].fr === "des chats" || "des chattes") {
        assert.equal(result[0].en[0], "cats", "cats should be the translation");
      }
      if (result[0].fr === "les chats" || "les chattes") {
        assert.equal(
          result[0].en[0],
          "the cats",
          "the cats should be the translation"
        );
      }
    } else {
      assert.isArray(
        result[0].fr,
        "the destination language response should be inside an array"
      );
      assert.lengthOf(
        result[0].fr,
        2,
        "the destination language array should have a length of two"
      );
      assert.equal(
        result[0].en,
        "a cat" || "the cat" || "cats" || "the cats",
        "if en is the source language, a correct word should be selected"
      );
      if (result[0].en === "a cat") {
        assert.include(
          result[0].fr,
          "un chat" && "une chatte",
          "the response should include un chat et une chatte"
        );
      }
      if (result[0].en === "the cat") {
        assert.include(
          result[0].fr,
          "le chat" && "la chatte",
          "the response should include le chat et la chatte"
        );
      }
      if (result[0].en === "cats") {
        assert.include(
          result[0].fr,
          "des chats" && "des chattes",
          "the response should include les chats et les chattes"
        );
      }
      if (result[0].en === "the cats") {
        assert.include(
          result[0].fr,
          "les chats" && "les chattes",
          "the response should include les chats et les chattes"
        );
      }
    }
  });
});
