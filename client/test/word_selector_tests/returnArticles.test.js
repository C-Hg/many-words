/* eslint-disable func-names */
/* eslint-env mocha */

import chai from "chai";
import getFrenchArticle from "../../src/controllers/exercise/word_selector/getFrenchArticle.function";
import getEnglishArticle from "../../src/controllers/exercise/word_selector/getEnglishArticle.function";

const { assert } = chai;

suite("Return Articles", function() {
  suite("Return FR Articles function", function() {
    test("definite, masc_sing", function() {
      const result = getFrenchArticle("masc_sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "le", "result should be 'le'");
    });
    test("definite, masc_plur", function() {
      const result = getFrenchArticle("masc_plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "les", "result should be 'les'");
    });
    test("definite, fem_sing", function() {
      const result = getFrenchArticle("fem_sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "la", "result should be 'la'");
    });
    test("definite, fem_plur", function() {
      const result = getFrenchArticle("fem_plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "les", "result should be 'les'");
    });
    test("definite, masc_sing l'", function() {
      const result = getFrenchArticle("masc_sing", "definite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'", "result should be 'l''");
    });
    test("definite, fem_sing l'", function() {
      const result = getFrenchArticle("fem_sing", "definite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'", "result should be 'l''");
    });
    test("indefinite, masc_sing", function() {
      const result = getFrenchArticle("masc_sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "un", "result should be 'un'");
    });
    test("indefinite, masc_plur", function() {
      const result = getFrenchArticle("masc_plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "des", "result should be 'des'");
    });
    test("indefinite, fem_sing", function() {
      const result = getFrenchArticle("fem_sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "une", "result should be 'une'");
    });
    test("indefinite, fem_plur", function() {
      const result = getFrenchArticle("fem_plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "des", "result should be 'des'");
    });
  });

  suite("Return EN Articles function", function() {
    test("definite, sing", function() {
      const result = getEnglishArticle("sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "the", "result should be 'the'");
    });
    test("definite, plur", function() {
      const result = getEnglishArticle("plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "the", "result should be 'the'");
    });
    test("indefinite, sing", function() {
      const result = getEnglishArticle("sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "a", "result should be 'a'");
    });
    test("indefinite, plur", function() {
      const result = getEnglishArticle("plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "", "result should be ''");
    });
    test("indefinite, sing an", function() {
      const result = getEnglishArticle("sing", "indefinite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "an", "result should be 'an'");
    });
  });
});
