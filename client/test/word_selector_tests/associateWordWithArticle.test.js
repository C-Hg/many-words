/* eslint-disable func-names */
/* eslint-env mocha */
import chai from "chai";
import associateFrenchWordWithArticle from "../../src/controllers/exercise/word_selector/associateFrenchWordWithArticle.function";
import associateEnglishWordWithArticle from "../../src/controllers/exercise/word_selector/associateEnglishWorkWithArticle.function";

const { assert } = chai;

suite("Associate word with article", function() {
  suite("Associate FR word with article", function() {
    test("masc sing", function() {
      const result = associateFrenchWordWithArticle("le", "chat");
      assert.isString(result, "result should be a string");
      assert.equal(result, "le chat", "result should be 'le chat'");
    });
    test("plural indefinite", function() {
      const result = associateFrenchWordWithArticle("des", "chats");
      assert.isString(result, "result should be a string");
      assert.equal(result, "des chats", "result should be 'des chats'");
    });
    test('article "l"', function() {
      const result = associateFrenchWordWithArticle("l'", "oiseau");
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'oiseau", "result should be 'l'oiseau'");
    });
    test("no article", function() {
      const result = associateFrenchWordWithArticle("", "avancer");
      assert.isString(result, "result should be a string");
      assert.equal(result, "avancer", "result should be 'avancer'");
    });
  });
  suite("Associate EN word with article", function() {
    test("masc sing", function() {
      const result = associateEnglishWordWithArticle("a", "cat");
      assert.isString(result, "result should be a string");
      assert.equal(result, "a cat", "result should be 'a cat'");
    });
    test("plural indefinite", function() {
      const result = associateEnglishWordWithArticle("", "cats");
      assert.isString(result, "result should be a string");
      assert.equal(result, "cats", "result should be 'cats'");
    });
    test("article 'an'", function() {
      const result = associateEnglishWordWithArticle("an", "ocean");
      assert.isString(result, "result should be a string");
      assert.equal(result, "an ocean", "result should be 'an ocean'");
    });
    test("no article", function() {
      const result = associateEnglishWordWithArticle("", "forward");
      assert.isString(result, "result should be a string");
      assert.equal(result, "forward", "result should be 'forward'");
    });
  });
});
