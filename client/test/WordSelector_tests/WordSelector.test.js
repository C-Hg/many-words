/* eslint-env mocha */
import randomPicker from "../../src/Functions/Common/RandomPicker.function";
import wordSelector from "../../src/Functions/WordSelector_functions/WordSelector.function";
import chai from "chai";
const assert = chai.assert;

suite("Random Picker function", function() {
  test("Selects fr or en as a language", function() {
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
      "definite or indefinite should be picked "
    );
  });
});

suite("Word Filter function", function() {
  test("Unique form with no article", function() {
    let result = wordSelector.fr_en_wordSelector([
      {
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
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "fr or en should be picked "
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
        "to walk",
        "the destination language translation should be 'to walk'"
      );
    } else {
      assert.propertyVal(result[0], "en", "to walk");
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
        result[0].fr[0],
        "marcher",
        "the destination language translation should be 'marcher'"
      );
    }
  });

  test("Noun with 4 forms with article, no alternative", function() {
    let result = wordSelector.fr_en_wordSelector([
      {
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
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "fr or en should be picked"
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
      assert.match(
        result[0].fr,
        /^un\schat$|^une\schatte$|^le\schat$|^la\schatte$|^les\schats$|^les\schattes|^des\schats$|^des\schattes$/,
        "if fr is the source language, a correct word should be selected"
      );

      if (result[0].fr === "un chat" || result[0].fr === "une chatte") {
        assert.equal(
          result[0].en[0],
          "a cat",
          "a cat should be the translation"
        );
      }
      if (result[0].fr === "le chat" || result[0].fr === "la chatte") {
        assert.equal(
          result[0].en[0],
          "the cat",
          "the cat should be the translation"
        );
      }
      if (result[0].fr === "des chats" || result[0].fr === "des chattes") {
        assert.equal(result[0].en[0], "cats", "cats should be the translation");
      }
      if (result[0].fr === "les chats" || result[0].fr === "les chattes") {
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
      assert.match(
        result[0].en,
        /^a\scat$|^the\scat$|^cats$|^the\scats$/,
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
