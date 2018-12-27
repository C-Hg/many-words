/* eslint-env mocha */
const regex = require("../markdown_parser/markdownRegex");
const {
  readMdFile
} = require("../markdown_fetching_functions/readMarkdownFile.function");
const path = require("path");
const chai = require("chai");
const assert = chai.assert;

// these tests aim to evaluate the regex only, they rely on the test file journey.md
const testFilePath = path.resolve(
  "./test/tested_Md_files/testing_subfolder_search/journey.md"
);

suite("Markdown regex", function() {
  let mdData;
  before(() => {
    return new Promise(async (resolve, reject) => {
      mdData = await readMdFile(testFilePath);
      resolve();
    });
  });

  test("general data", function() {
    assert.equal(
      mdData.match(regex.uniqueForm),
      "false",
      "the unique form boolean should be 'false'"
    );
    assert.equal(mdData.match(regex.type), "noun", "the type should be 'noun'");
  });

  test("EN data", function() {
    assert.equal(
      mdData.match(regex.enName),
      "journey",
      "EN name should be 'journey'"
    );

    assert.equal(
      mdData.match(regex.enSingMain),
      "journey",
      "EN main sing form should be 'journey'"
    );
    assert.equal(
      mdData.match(regex.enSingAlt1),
      "to travel far away",
      "EN alt1 sing form should be 'to travel far away'"
    );
    assert.isNull(
      mdData.match(regex.enSingAlt2),
      "EN alt2 sing form should be null"
    );
    assert.equal(
      mdData.match(regex.enSingAlt3),
      "hello",
      "EN alt3 sing form should be 'hello'"
    );
    assert.equal(
      mdData.match(regex.enPlurMain),
      "journeys",
      "EN main plur form should be 'journeys'"
    );
    assert.equal(
      mdData.match(regex.enPlurAlt1),
      "travels",
      "EN alt1 plur form should be 'travels'"
    );
    assert.isNull(
      mdData.match(regex.enPlurAlt2),
      "EN alt2 plur form should be null"
    );
    assert.isNull(
      mdData.match(regex.enPlurAlt3),
      "EN alt3 plur form should be 'null'"
    );
    assert.equal(
      mdData.match(regex.enUniqueMain),
      "world",
      "EN main unique form should be 'world'"
    );
    assert.isNull(
      mdData.match(regex.enUniqueAlt1),
      "EN alt1 unique form should be null"
    );
    assert.isNull(
      mdData.match(regex.enUniqueAlt2),
      "EN alt2 unique form should be null"
    );
    assert.equal(
      mdData.match(regex.enUniqueAlt3),
      "world",
      "EN alt3 unique form should be 'world'"
    );
    assert.equal(
      mdData.match(regex.isAnMain),
      "x",
      "EN main isAn should be 'x'"
    );
    assert.isNull(
      mdData.match(regex.isAnAlt1),
      "EN alt1 isAn should be 'null'"
    );
    assert.equal(
      mdData.match(regex.isAnAlt2),
      "true",
      "EN alt2 isAn should be 'true'"
    );
    assert.equal(
      mdData.match(regex.isAnAlt3),
      "x",
      "EN alt3 isAn should be 'x'"
    );
  });

  test("FR data", function() {
    assert.equal(
      mdData.match(regex.frName),
      "voyage",
      "FR name should be 'voyage'"
    );
    assert.equal(
      mdData.match(regex.frMascSingMain),
      "voyage",
      "FR masc_sing main should be 'voyage'"
    );
    assert.equal(
      mdData.match(regex.frMascSingAlt1),
      "voyageurs",
      "FR masc_sing alt1 should be 'voyageurs'"
    );
    assert.isNull(
      mdData.match(regex.frMascSingAlt2),
      "FR masc_sing alt2 should be null"
    );
    assert.equal(
      mdData.match(regex.frMascSingAlt3),
      "canoë après-midi",
      "FR masc_sing alt3 should be null"
    );
    assert.equal(
      mdData.match(regex.frMascPlurMain),
      "voyages",
      "FR masc_plur main should be 'voyages'"
    );
    assert.equal(
      mdData.match(regex.frMascPlurAlt1),
      "voyageuses",
      "FR masc_plur alt1 should be 'voyageuses'"
    );
    assert.isNull(
      mdData.match(regex.frMascPlurAlt2),
      "FR masc_plur alt2 should be null"
    );
    assert.equal(
      mdData.match(regex.frMascPlurAlt3),
      "Ânes",
      "FR masc_plur alt3 should be 'Ânes'"
    );
    assert.equal(
      mdData.match(regex.frFemSingMain),
      "fleur",
      "FR fem_sing main should be 'fleur'"
    );
    assert.equal(
      mdData.match(regex.frFemSingAlt1),
      "course à pied",
      "FR fem_sing alt1 should be 'course à pied'"
    );
    assert.isNull(
      mdData.match(regex.frFemSingAlt2),
      "FR fem_sing alt2 should be null"
    );
    assert.equal(
      mdData.match(regex.frFemSingAlt3),
      "Belle-Pensée",
      "FR fem_sing alt3 should be 'Belle-Pensée'"
    );
    assert.equal(
      mdData.match(regex.frFemPlurMain),
      "fleurs",
      "FR fem_plur main should be 'fleurs'"
    );
    assert.isNull(
      mdData.match(regex.frFemPlurAlt1),
      "FR fem_plur alt1 should be null"
    );
    assert.isNull(
      mdData.match(regex.frFemPlurAlt2),
      "FR fem_plur alt2 should be null"
    );
    assert.equal(
      mdData.match(regex.frFemPlurAlt3),
      "îles",
      "FR fem_plur alt3 should be 'îles'"
    );
    assert.equal(
      mdData.match(regex.frUniqueMain),
      "voyageons",
      "FR unique_form main should be 'voyageons'"
    );
    assert.equal(
      mdData.match(regex.frUniqueAlt1),
      "monde",
      "FR unique_form alt1 should be 'monde'"
    );
    assert.isNull(
      mdData.match(regex.frUniqueAlt2),
      "FR unique_form alt2 should be null"
    );
    assert.equal(
      mdData.match(regex.frUniqueAlt3),
      "mondes",
      "FR unique_form alt3 should be 'mondes'"
    );
    assert.isNull(mdData.match(regex.LApostropheMain));
    assert.isNull(mdData.match(regex.LApostropheAlt1));
    assert.equal(
      mdData.match(regex.LApostropheAlt2),
      "x",
      "FR l' alt2 should be 'x'"
    );
    assert.equal(
      mdData.match(regex.LApostropheAlt3),
      "true",
      "FR l' alt3 should be 'true'"
    );
  });
});
