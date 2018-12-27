/* eslint-env mocha */
const {
  getLessonName
} = require("../markdown_parser/functions/getLessonName.function");
const chai = require("chai");
const assert = chai.assert;

const path1 = "repos/many-words/exercises/FR-EN/Easy_lessons/Journey.md";
const path2 = "repos/many-words/exercises/FR-EN/Animals/Journey.md";
const path3 = "repos/many-words/exercises/FR-EN/Animals/Journey";

suite("Get lesson name function", function() {
  test("normal path 1", function() {
    let result = getLessonName(path1);
    assert.equal(result[0], "Easy_lessons");
  });

  test("normal path 2", function() {
    let result = getLessonName(path2);
    assert.equal(result[0], "Animals");
  });

  test("invalid path", function() {
    let result = getLessonName(path3);
    assert.isNull(result);
  });
});
