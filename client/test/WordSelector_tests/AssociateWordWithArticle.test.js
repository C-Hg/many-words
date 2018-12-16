/* eslint-env mocha */
import { associateFrWordWithArticle } from "../../src/Functions/WordSelector_functions/AssociateWordWithArticle.function";
import { associateEnWordWithArticle } from "../../src/Functions/WordSelector_functions/AssociateWordWithArticle.function";
import chai from "chai";
const assert = chai.assert;

suite("Associate word with article", function() {
  suite("Associate FR word with article", function() {
    test("masc sing", function() {
      let result = associateFrWordWithArticle("le", "chat");
      assert.isString(result, "result should be a string");
      assert.equal(result, "le chat", "result should be 'le chat'");
    });
    test("plural indefinite", function() {
      let result = associateFrWordWithArticle("des", "chats");
      assert.isString(result, "result should be a string");
      assert.equal(result, "des chats", "result should be 'des chats'");
    });
    test('article "l"', function() {
      let result = associateFrWordWithArticle("l'", "oiseau");
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'oiseau", "result should be 'l'oiseau'");
    });
    test("no article", function() {
      let result = associateFrWordWithArticle("", "avancer");
      assert.isString(result, "result should be a string");
      assert.equal(result, "avancer", "result should be 'avancer'");
    });
  });
  suite("Associate EN word with article", function() {
    test("masc sing", function() {
      let result = associateEnWordWithArticle("a", "cat");
      assert.isString(result, "result should be a string");
      assert.equal(result, "a cat", "result should be 'a cat'");
    });
    test("plural indefinite", function() {
      let result = associateEnWordWithArticle("", "cats");
      assert.isString(result, "result should be a string");
      assert.equal(result, "cats", "result should be 'cats'");
    });
    test("article 'an'", function() {
      let result = associateEnWordWithArticle("an", "ocean");
      assert.isString(result, "result should be a string");
      assert.equal(result, "an ocean", "result should be 'an ocean'");
    });
    test("no article", function() {
      let result = associateEnWordWithArticle("", "forward");
      assert.isString(result, "result should be a string");
      assert.equal(result, "forward", "result should be 'forward'");
    });
  });
});
