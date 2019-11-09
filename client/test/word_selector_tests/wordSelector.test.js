/* eslint-env mocha */
import chai from "chai";
import wordSelector from "../../src/controllers/exercise/word_selector/wordSelector.function";

const { assert } = chai;

suite("FR/EN Word Selector function", function() {
  suite("No previous stats", function() {
    test("Unique form, verb", function() {
      const result = wordSelector({
        words: [
          {
            enName: "walk",
            frName: "marcher",
            hasUniqueForm: true,
            type: "verb",
            fr: [
              {
                uniqueForm: "marcher",
              },
            ],
            en: [
              {
                uniqueForm: "to walk",
              },
            ],
          },
        ],
      });
      // expected response :
      // [{sourceLanguage: "fr" or "en",
      // fr: ["marcher"],
      // en: ["to walk"]}]
      assert.isArray(result, "the result should be an array");
      assert.lengthOf(result, 1, "the result array length should be one");
      assert.match(
        result[0].selectedForm[1],
        /^fr$|^en$/,
        "FR or EN should be picked "
      );
      assert.isArray(result[0].fr, "FR word should be inside an array");
      assert.isArray(result[0].en, "EN word should be inside an array");
      assert.equal(result[0].fr[0], "marcher");
      assert.equal(result[0].en[0], "to walk");
    });

    test("Noun, 4 forms with article, no alternative", function() {
      const result = wordSelector({
        words: [
          {
            enName: "cat",
            frName: "chat",
            type: "noun",
            fr: [
              {
                acceptedForms: [
                  "masc_sing",
                  "masc_plur",
                  "fem_sing",
                  "fem_plur",
                ],
                masc_sing: "chat",
                masc_plur: "chats",
                fem_sing: "chatte",
                fem_plur: "chattes",
              },
            ],
            en: [
              {
                acceptedForms: ["sing", "plur"],
                sing: "cat",
                plur: "cats",
              },
            ],
          },
        ],
      });
      assert.isArray(result, "the result should be an array");
      assert.lengthOf(result, 1, "the result array length should be one");
      assert.equal(result[0].selectedForm[0], "cat", "enName is cat");
      assert.match(
        result[0].selectedForm[1],
        /^fr$|^en$/,
        "FR or EN should be picked"
      );
      if (result[0].selectedForm[1] === "fr") {
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
        if (
          result[0].fr[0] === "le chat" ||
          result[0].fr[0] === ["la chatte"]
        ) {
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
          assert.equal(
            result[0].en[0],
            "cats",
            "cats should be the translation"
          );
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
      const result = wordSelector({
        words: [
          {
            enName: "beautiful",
            frName: "beau",
            type: "adjective",
            fr: [
              {
                acceptedForms: [
                  "masc_sing",
                  "masc_plur",
                  "fem_sing",
                  "fem_plur",
                ],
                masc_sing: "beau",
                masc_plur: "beaux",
                fem_sing: "belle",
                fem_plur: "belles",
              },
              {
                acceptedForms: [
                  "masc_sing",
                  "masc_plur",
                  "fem_sing",
                  "fem_plur",
                ],
                masc_sing: "joli",
                masc_plur: "jolis",
                fem_sing: "jolie",
                fem_plur: "jolies",
              },
            ],
            en: [
              {
                acceptedForms: ["uniqueForm"],
                uniqueForm: "beautiful",
              },
              {
                acceptedForms: ["uniqueForm"],
                uniqueForm: "pretty",
              },
            ],
          },
        ],
      });
      assert.isArray(result, "the result should be an array");
      assert.lengthOf(result, 1, "the result array length should be one");
      assert.match(
        result[0].selectedForm[1],
        /^fr$|^en$/,
        "FR or EN should be picked"
      );
      if (result[0].selectedForm[1] === "fr") {
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
      if (result[0].selectedForm[1] === "en") {
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
      const result = wordSelector({
        words: [
          {
            enName: "smile",
            frName: "sourire",
            hasUniqueForm: true,
            type: "verb",
            fr: [
              {
                uniqueForm: "sourire",
              },
            ],
            en: [
              {
                uniqueForm: "to smile",
              },
            ],
            lessonId: "#aLongId",
          },
          {
            enName: "apple",
            frName: "pomme",
            hasUniqueForm: false,
            type: "noun",
            fr: [
              {
                acceptedForms: ["fem_sing", "fem_plur"],
                fem_sing: "pomme",
                fem_plur: "pommes",
              },
            ],
            en: [
              {
                acceptedForms: ["sing", "plur"],
                sing: "apple",
                plur: "apples",
                isArticleAn: true,
              },
            ],
            lessonId: "#aLongId",
          },
          {
            enName: "plane",
            frName: "avion",
            hasUniqueForm: false,
            type: "noun",
            fr: [
              {
                acceptedForms: ["masc_sing", "masc_plur"],
                masc_sing: "avion",
                masc_plur: "avions",
                isLApostrophe: true,
              },
            ],
            en: [
              {
                acceptedForms: ["sing", "plur"],
                sing: "plane",
                plur: "planes",
              },
            ],
            lessonId: "#aLongId",
          },
        ],
      });
      assert.isArray(result, "the result should be an array");
      assert.lengthOf(result, 3, "the result array length should be three");

      // first word assessments
      assert.match(
        result[0].selectedForm[1],
        /^fr$|^en$/,
        "FR or EN should be picked"
      );
      assert.isArray(result[0].fr, "FR word should be inside an array");
      assert.isArray(result[0].en, "EN word should be inside an array");
      assert.lengthOf(result[0].fr, 1, "FR array length should be one");
      assert.lengthOf(result[0].en, 1, "EN array length should be one");

      // form selected assessments
      // tests only one selected word to avoid redundancy, and because word order is shuffled

      let i = 0;
      if (result[0].selectedForm[0] === "apple") {
        i = 0;
      } else if (result[1].selectedForm[0] === "apple") {
        i = 1;
      } else if (result[2].selectedForm[0] === "apple") {
        i = 2;
      }

      assert.lengthOf(
        result[i].fr,
        1,
        "FR array length should be one (source)"
      );
      assert.lengthOf(
        result[i].en,
        1,
        "EN array length should be one (destination)"
      );
      assert.match(
        result[i].fr[0],
        /^une\spomme$|^la\spomme$|^des\spommes$|^les\spommes$|/
      );
      if (result[i].fr[0] === "la pomme") {
        assert.equal(result[i].en[0], "the apple");
      }
      if (result[i].fr[0] === "une pomme") {
        assert.equal(result[i].en[0], "an apple");
      }
      if (result[i].fr[0] === "les pommes") {
        assert.equal(result[i].en[0], "the apples");
      }
      if (result[i].fr[0] === "des pommes") {
        assert.equal(result[i].en[0], "apples");
      }

      if (result[i].selectedForm[i] === "en") {
        assert.lengthOf(
          result[i].en,
          1,
          "EN array length should be one (source)"
        );
        assert.lengthOf(
          result[i].fr,
          1,
          "FR array length should be one (destination)"
        );
        assert.match(
          result[i].en[0],
          /^an\sapple$|^the\sapple$|^apples$|^the\sapples$|/
        );
        if (result[i].en[0] === "the apple") {
          assert.equal(result[i].fr[0], "la pomme");
        }
        if (result[i].en[0] === "an apple") {
          assert.equal(result[i].fr[0], "une pomme");
        }
        if (result[i].en[0] === "the apples") {
          assert.equal(result[i].fr[0], "les pommes");
        }
        if (result[i].en[0] === "apples") {
          assert.equal(result[i].fr[0], "des pommes");
        }
      }
    });

    suite("Efficiency stats given", function() {
      test("Combination of a verb and a noun", function() {
        const result = wordSelector({
          words: [
            {
              enName: "smile",
              frName: "sourire",
              hasUniqueForm: true,
              type: "verb",
              fr: [
                {
                  uniqueForm: "sourire",
                },
              ],
              en: [
                {
                  uniqueForm: "to smile",
                },
              ],
              lessonId: "#aLongId",
            },
            {
              enName: "apple",
              frName: "pomme",
              hasUniqueForm: false,
              type: "noun",
              fr: [
                {
                  acceptedForms: ["fem_sing", "fem_plur"],
                  fem_sing: "pomme",
                  fem_plur: "pommes",
                },
              ],
              en: [
                {
                  acceptedForms: ["sing", "plur"],
                  sing: "apple",
                  plur: "apples",
                  isArticleAn: true,
                },
              ],
              lessonId: "#aLongId",
            },
          ],
          statsByForm: [
            [
              {
                language: "en",
                form: "uniqueForm",
                stats: -0.5,
              },
            ],
            [
              {
                language: "en",
                form: "sing",
                stats: -1,
              },
              {
                language: "en",
                form: "plur",
                stats: -1,
              },
            ],
          ],
        });
        assert.isArray(result, "the result should be an array");
        assert.lengthOf(result, 2, "the result array length should be two");

        // first word assessments
        assert.equal(result[0].selectedForm[1], "en", "EN should be picked");
        assert.isArray(result[0].fr, "FR word should be inside an array");
        assert.isArray(result[0].en, "EN word should be inside an array");
        assert.lengthOf(result[0].fr, 1, "FR array length should be one");
        assert.lengthOf(result[0].en, 1, "EN array length should be one");
      });
    });
  });
});
