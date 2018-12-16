/* eslint-env mocha */
import { fr_en_wordSelector } from "../../src/Functions/WordSelector_functions/WordSelector.function";
import chai from "chai";
const assert = chai.assert;

suite("FR/EN Word Selector function", function() {
  test("Unique form with no article", function() {
    let result = fr_en_wordSelector([
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
    //expected response :
    //[{sourceLanguage: "fr" or "en",
    //fr: ["marcher"],
    //en: ["to walk"]}]
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 1, "the result array length should be one");
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "fr or en should be picked "
    );
    assert.isArray(result[0].fr, "fr word should be inside an array");
    assert.isArray(result[0].en, "en word should be inside an array");
    assert.equal(result[0].fr[0], "marcher");
    assert.equal(result[0].en[0], "to walk");
  });

  test("Noun with 4 forms with article, no alternative", function() {
    let result = fr_en_wordSelector([
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
        result[0].fr[0],
        /^un\schat$|^une\schatte$|^le\schat$|^la\schatte$|^les\schats$|^les\schattes|^des\schats$|^des\schattes$/,
        "if fr is the source language, a correct word should be selected"
      );

      if (result[0].fr[0] === "un chat" || result[0].fr[0] === "une chatte") {
        assert.equal(
          result[0].en[0],
          "a cat",
          "a cat should be the translation"
        );
      }
      if (result[0].fr[0] === "le chat" || result[0].fr[0] === ["la chatte"]) {
        assert.equal(
          result[0].en[0],
          "the cat",
          "the cat should be the translation"
        );
      }
      if (
        result[0].fr[0] === "des chats" ||
        result[0].fr[0] === "des chattes"
      ) {
        assert.equal(result[0].en[0], "cats", "cats should be the translation");
      }
      if (
        result[0].fr[0] === "les chats" ||
        result[0].fr[0] === "les chattes"
      ) {
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
        "the fr destination language array should have a length of two"
      );
      assert.match(
        result[0].en,
        /^a\scat$|^the\scat$|^cats$|^the\scats$/,
        "if en is the source language, a correct word should be selected"
      );
      if (result[0].en[0] === "a cat") {
        assert.equal(result[0].fr[0], "un chat");
        assert.equal(result[0].fr[1], "une chatte");
      }
      if (result[0].en[0] === "the cat") {
        assert.equal(result[0].fr[0], "le chat");
        assert.equal(result[0].fr[1], "la chatte");
      }
      if (result[0].en[0] === "cats") {
        assert.equal(result[0].fr[0], "des chats");
        assert.equal(result[0].fr[1], "des chattes");
      }
      if (result[0].en[0] === "the cats") {
        assert.equal(result[0].fr[0], "les chats");
        assert.equal(result[0].fr[1], "les chattes");
      }
    }
  });
});
