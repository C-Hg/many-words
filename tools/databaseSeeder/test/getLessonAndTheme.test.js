/* eslint-env mocha */
const getLessonAndTheme = require("../../common/getLessonAndTheme.function");
const chai = require("chai");
const assert = chai.assert;

const path1 = "repos/many-words/exercises/FR-EN/animals/mammals/whale.md";
const path2 = "repos/many-words/exercises/FR-EN/animals/animals_basic/dog.md";
const path3 = "repos/many-words/exercises/FR-EN/Animals/Journey";

suite("Get lesson name function", function() {
  test("normal path 1, lesson", function() {
    let result = getLessonAndTheme(path1);
    assert.equal(result[0], "mammals");
  });
  test("normal path 1, theme", function() {
    let result = getLessonAndTheme(path1);
    assert.equal(result[1], "animals");
  });

  test("normal path 2, lesson", function() {
    let result = getLessonAndTheme(path2);
    assert.equal(result[0], "animals_basic");
  });
  test("normal path 2, theme", function() {
    let result = getLessonAndTheme(path2);
    assert.equal(result[1], "animals");
  });

  test("invalid path", function() {
    let result = getLessonAndTheme(path3);
    console.log(result);
    assert.isNull(result[0]);
  });
});
