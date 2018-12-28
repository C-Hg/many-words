/* eslint-env mocha */
import {
  returnFrArticle,
  returnEnArticle
} from "../../src/controllers/exercise_fetcher/word_selector/returnArticles.functions";
import chai from "chai";
const assert = chai.assert;

suite("Return Articles", function() {
  suite("Return FR Articles function", function() {
    test("definite, masc_sing", function() {
      let result = returnFrArticle("masc_sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "le", "result should be 'le'");
    });
    test("definite, masc_plur", function() {
      let result = returnFrArticle("masc_plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "les", "result should be 'les'");
    });
    test("definite, fem_sing", function() {
      let result = returnFrArticle("fem_sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "la", "result should be 'la'");
    });
    test("definite, fem_plur", function() {
      let result = returnFrArticle("fem_plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "les", "result should be 'les'");
    });
    test("definite, masc_sing l'", function() {
      let result = returnFrArticle("masc_sing", "definite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'", "result should be 'l''");
    });
    test("definite, fem_sing l'", function() {
      let result = returnFrArticle("fem_sing", "definite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "l'", "result should be 'l''");
    });
    test("indefinite, masc_sing", function() {
      let result = returnFrArticle("masc_sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "un", "result should be 'un'");
    });
    test("indefinite, masc_plur", function() {
      let result = returnFrArticle("masc_plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "des", "result should be 'des'");
    });
    test("indefinite, fem_sing", function() {
      let result = returnFrArticle("fem_sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "une", "result should be 'une'");
    });
    test("indefinite, fem_plur", function() {
      let result = returnFrArticle("fem_plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "des", "result should be 'des'");
    });
  });

  suite("Return EN Articles function", function() {
    test("definite, sing", function() {
      let result = returnEnArticle("sing", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "the", "result should be 'the'");
    });
    test("definite, plur", function() {
      let result = returnEnArticle("plur", "definite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "the", "result should be 'the'");
    });
    test("indefinite, sing", function() {
      let result = returnEnArticle("sing", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "a", "result should be 'a'");
    });
    test("indefinite, plur", function() {
      let result = returnEnArticle("plur", "indefinite", false);
      assert.isString(result, "result should be a string");
      assert.equal(result, "", "result should be ''");
    });
    test("indefinite, sing an", function() {
      let result = returnEnArticle("sing", "indefinite", true);
      assert.isString(result, "result should be a string");
      assert.equal(result, "an", "result should be 'an'");
    });
  });
});
