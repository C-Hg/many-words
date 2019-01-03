/* eslint-env mocha */
import getSwitchesStates from "../../src/controllers/learning_fetcher/getSwitchesStates.function";
import chai from "chai";
const assert = chai.assert;

suite("Get switches states function", function() {
  test("No switches", function() {
    let result = getSwitchesStates([
      {
        type: "verb",
        hasUniqueForm: true,
        fr: [
          {
            uniqueForm: "marcher"
          }
        ],
        en: [
          {
            uniqueForm: "to walk"
          }
        ]
      },
      {
        type: "verb",
        hasUniqueForm: true,
        fr: [
          {
            uniqueForm: "courir"
          }
        ],
        en: [
          {
            uniqueForm: "to run"
          }
        ]
      }
    ]);
    assert.isArray(result);
    assert.lengthOf(result, 3);
    assert.isFalse(result[0]);
    assert.isFalse(result[1]);
    assert.isFalse(result[2]);
  });

  test("All switches", function() {
    let result = getSwitchesStates([
      {
        type: "verb",
        hasUniqueForm: true,
        fr: [
          {
            uniqueForm: "marcher"
          }
        ],
        en: [
          {
            uniqueForm: "to walk"
          }
        ]
      },
      {
        type: "verb",
        hasUniqueForm: true,
        fr: [
          {
            uniqueForm: "courir"
          }
        ],
        en: [
          {
            uniqueForm: "to run"
          }
        ]
      },
      {
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
    assert.isArray(result);
    assert.lengthOf(result, 3);
    assert.equal(result[0], "singular");
    assert.equal(result[1], "masculine");
    assert.equal(result[2], "definite");
  });
});
