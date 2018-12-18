/* eslint-env mocha */
import { fr_en_wordSelector } from "../../src/Functions/WordSelector_functions/WordSelector.function";
import chai from "chai";
const assert = chai.assert;

suite("FR/EN Word Selector function", function() {
  test("Unique form, verb", function() {
    let result = fr_en_wordSelector([
      {
        en_name: "walk",
        fr_name: "marcher",
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
      "FR or EN should be picked "
    );
    assert.isArray(result[0].fr, "FR word should be inside an array");
    assert.isArray(result[0].en, "EN word should be inside an array");
    assert.equal(result[0].fr[0], "marcher");
    assert.equal(result[0].en[0], "to walk");
  });

  test("Noun, 4 forms with article, no alternative", function() {
    let result = fr_en_wordSelector([
      {
        en_name: "cat",
        fr_name: "chat",
        type: "noun",
        fr: [
          {
            acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
            masc_sing: "chat",
            masc_plur: "chats",
            fem_sing: "chatte",
            fem_plur: "chattes"
          }
        ],
        en: [
          {
            acceptedForms: ["sing", "plur"],
            sing: "cat",
            plur: "cats"
          }
        ]
      }
    ]);
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 1, "the result array length should be one");
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "FR or EN should be picked"
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
        "the FR destination language array should have a length of two"
      );
      assert.match(
        result[0].en,
        /^a\scat$|^the\scat$|^cats$|^the\scats$/,
        "if EN is the source language, a correct word should be selected"
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
  test("Adjective, 4 forms, 1 alternative each", function() {
    let result = fr_en_wordSelector([
      {
        en_name: "beautiful",
        fr_name: "beau",
        type: "adjective",
        fr: [
          {
            acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
            masc_sing: "beau",
            masc_plur: "beaux",
            fem_sing: "belle",
            fem_plur: "belles"
          },
          {
            acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
            masc_sing: "joli",
            masc_plur: "jolis",
            fem_sing: "jolie",
            fem_plur: "jolies"
          }
        ],
        en: [
          {
            acceptedForms: ["uniqueForm"],
            uniqueForm: "beautiful"
          },
          {
            acceptedForms: ["uniqueForm"],
            uniqueForm: "pretty"
          }
        ]
      }
    ]);
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 1, "the result array length should be one");
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "FR or EN should be picked"
    );
    if (result[0].sourceLanguage === "fr") {
      assert.isArray(result[0].fr, "FR result should be an array");
      assert.lengthOf(
        result[0].fr,
        1,
        "FR array length should be one (source)"
      );
      assert.match(
        result[0].fr[0],
        /^beau$|^beaux$|^belle$|^belles$/,
        "if FR is the source language, a correct word should be selected"
      );
      assert.isArray(result[0].en, "EN result should be an array");
      assert.lengthOf(
        result[0].en,
        2,
        "EN array length should be two (destination)"
      );
      assert.equal(
        result[0].en[0],
        "beautiful",
        "EN first possibility should be 'beautiful'"
      );
      assert.equal(
        result[0].en[1],
        "pretty",
        "EN first possibility should be 'pretty'"
      );
    }
    if (result[0].sourceLanguage === "en") {
      assert.isArray(result[0].en, "EN result should be an array");
      assert.lengthOf(
        result[0].en,
        1,
        "EN array length should be one (source)"
      );
      assert.equal(
        result[0].en[0],
        "beautiful",
        "EN response should be 'beautiful'"
      );
      assert.isArray(result[0].fr, "FR result should be an array");
      assert.lengthOf(
        result[0].fr,
        8,
        "FR array length should be eight (destination)"
      );
      assert.equal(
        result[0].fr[0],
        "beau",
        "FR first possibility should be 'beau'"
      );
      assert.equal(
        result[0].fr[2],
        "belle",
        "FR third possibility should be 'beaux'"
      );
      assert.equal(
        result[0].fr[4],
        "joli",
        "FR fifth possibility should be 'joli'"
      );
      assert.equal(
        result[0].fr[5],
        "jolis",
        "FR sixth possibility should be 'jolis'"
      );
      assert.equal(
        result[0].fr[7],
        "jolies",
        "FR eigth possibility should be 'jolies'"
      );
    }
  });
  test("Combination of a verb an 2 words", function() {
    let result = fr_en_wordSelector([
      {
        en_name: "smile",
        fr_name: "sourire",
        hasUniqueForm: true,
        type: "verb",
        fr: [
          {
            uniqueForm: "sourire"
          }
        ],
        en: [
          {
            uniqueForm: "to smile"
          }
        ],
        lessonId: "#aLongId"
      },
      {
        en_name: "apple",
        fr_name: "pomme",
        hasUniqueForm: false,
        type: "noun",
        fr: [
          {
            acceptedForms: ["fem_sing", "fem_plur"],
            fem_sing: "pomme",
            fem_plur: "pommes"
          }
        ],
        en: [
          {
            acceptedForms: ["sing", "plur"],
            sing: "apple",
            plur: "apples",
            isArticleAn: true
          }
        ],
        lessonId: "#aLongId"
      },
      {
        en_name: "plane",
        fr_name: "avion",
        hasUniqueForm: false,
        type: "noun",
        fr: [
          {
            acceptedForms: ["masc_sing", "masc_plur"],
            masc_sing: "avion",
            masc_plur: "avions",
            isLApostrophe: true
          }
        ],
        en: [
          {
            acceptedForms: ["sing", "plur"],
            sing: "plane",
            plur: "planes"
          }
        ],
        lessonId: "#aLongId"
      }
    ]);
    assert.isArray(result, "the result should be an array");
    assert.lengthOf(result, 3, "the result array length should be three");

    //first word assessments
    assert.match(
      result[0].sourceLanguage,
      /^fr$|^en$/,
      "FR or EN should be picked"
    );
    assert.isArray(result[0].fr, "FR word should be inside an array");
    assert.isArray(result[0].en, "EN word should be inside an array");
    assert.lengthOf(result[0].fr, 1, "FR array length should be one");
    assert.lengthOf(result[0].en, 1, "EN array length should be one");
    assert.equal(result[0].fr[0], "sourire");
    assert.equal(result[0].en[0], "to smile");

    //second word assessments
    assert.match(
      result[1].sourceLanguage,
      /^fr$|^en$/,
      "FR or EN should be picked"
    );
    assert.isArray(result[1].fr, "FR word should be inside an array");
    assert.isArray(result[1].en, "EN word should be inside an array");
    if (result[1].sourceLanguage === "fr") {
      assert.lengthOf(
        result[1].fr,
        1,
        "FR array length should be one (source)"
      );
      assert.lengthOf(
        result[1].en,
        1,
        "EN array length should be one (destination)"
      );
      assert.match(
        result[1].fr[0],
        /^une\spomme$|^la\spomme$|^des\spommes$|^les\spommes$|/
      );
      if (result[1].fr[0] === "la pomme") {
        assert.equal(result[1].en[0], "the apple");
      }
      if (result[1].fr[0] === "une pomme") {
        assert.equal(result[1].en[0], "an apple");
      }
      if (result[1].fr[0] === "les pommes") {
        assert.equal(result[1].en[0], "the apples");
      }
      if (result[1].fr[0] === "des pommes") {
        assert.equal(result[1].en[0], "apples");
      }
    }
    if (result[1].sourceLanguage === "en") {
      assert.lengthOf(
        result[1].en,
        1,
        "EN array length should be one (source)"
      );
      assert.lengthOf(
        result[1].fr,
        1,
        "FR array length should be one (destination)"
      );
      assert.match(
        result[1].en[0],
        /^an\sapple$|^the\sapple$|^apples$|^the\sapples$|/
      );
      if (result[1].en[0] === "the apple") {
        assert.equal(result[1].fr[0], "la pomme");
      }
      if (result[1].en[0] === "an apple") {
        assert.equal(result[1].fr[0], "une pomme");
      }
      if (result[1].en[0] === "the apples") {
        assert.equal(result[1].fr[0], "les pommes");
      }
      if (result[1].en[0] === "apples") {
        assert.equal(result[1].fr[0], "des pommes");
      }
    }

    // third word assessments
    assert.match(
      result[2].sourceLanguage,
      /^fr$|^en$/,
      "FR or EN should be picked"
    );
    assert.isArray(result[2].fr, "FR word should be inside an array");
    assert.isArray(result[2].en, "EN word should be inside an array");
    if (result[2].sourceLanguage === "fr") {
      assert.lengthOf(
        result[2].fr,
        1,
        "FR array length should be one (source)"
      );
      assert.lengthOf(
        result[2].en,
        1,
        "EN array length should be one (destination)"
      );
      assert.match(
        result[2].fr[0],
        /^un\savion$|^l'avion$|^des\savions$|^les\savions$|/
      );
      if (result[2].fr[0] === "un avion") {
        assert.equal(result[2].en[0], "a plane");
      }
      if (result[2].fr[0] === "l'avion") {
        assert.equal(result[2].en[0], "the plane");
      }
      if (result[2].fr[0] === "des avions") {
        assert.equal(result[2].en[0], "planes");
      }
      if (result[2].fr[0] === "les avions") {
        assert.equal(result[2].en[0], "the planes");
      }
    }
    if (result[2].sourceLanguage === "en") {
      assert.lengthOf(
        result[2].fr,
        1,
        "FR array length should be one (destination)"
      );
      assert.lengthOf(
        result[2].en,
        1,
        "EN array length should be one (source)"
      );
      assert.match(
        result[2].en[0],
        /^a\splane$|^the'plane$|^planes$|^the\splanes$|/
      );
      if (result[2].en[0] === "a plane") {
        assert.equal(result[2].fr[0], "un avion");
      }
      if (result[2].en[0] === "the plane") {
        assert.equal(result[2].fr[0], "l'avion");
      }
      if (result[2].en[0] === "planes") {
        assert.equal(result[2].fr[0], "des avions");
      }
      if (result[2].en[0] === "the planes") {
        assert.equal(result[2].fr[0], "les avions");
      }
    }
  });
});
